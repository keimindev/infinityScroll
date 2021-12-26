import React, { useState, useEffect } from "react";
import { history } from "./redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "./redux/modules/post";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";

const Main = () => {
  const dispatch = useDispatch();
  const post_data = useSelector((state) => state.post);
  console.log(post_data);
  const [items, setItems] = useState([]);
  const [hasMore, sethasMore] = useState(true);
  const [page, setpage] = useState(post_data.page);

  useEffect(() => {
    //첫 로딩시 불러오는 데이터
    dispatch(postActions.getPostAction(page));
  }, [page]);

  //scroll event
  //스크롤시 다음페이지를 보여주는 것
  const getData = () => {
    let data;
    let pages = page + 1;
    axios
      .get(`https://picsum.photos/v2/list?page=${pages}&limit=5`)
      .then((res) => {
        data = res.data;
        //데이터가 사이즈보다 작을 경우
        if (data.length === 0 || data.length < 5) {
          sethasMore(false);
          setItems([...items, ...data]);
        } else {
          //데이터가 사이즈만큼 넘어왔을 때
          setItems([...items, ...data]);
          setpage(pages + 1);
        }
      });
  };
  return (
    <>
      {/* 다른 페이지로 넘어갔다가 다시 돌아왔을 때 페이지가 페이지가 그대로인지 확인하기 위한 버튼 */}
      <button onClick={() => history.push("/page")}>
        Move to another page
      </button>
      <InfiniteScroll
        dataLength={post_data.posts.length} //This is important field to render the next data
        next={getData}
        hasMore={hasMore}
      >
        {post_data.posts.map((item, idx) => {
          return (
            <>
              <div className="imgbox" key={item.id}>
                <img src={item.download_url} alt="photo" />
              </div>
            </>
          );
        })}
      </InfiniteScroll>
    </>
  );
};

export default Main;
