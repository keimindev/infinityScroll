import React, { useEffect, useRef } from "react";

const InfinityScroll = (props) => {
  const { children, callNext, paging } = props;

  const spinnerRef = useRef(null);
  const handleObserver = new IntersectionObserver(([{ isIntersecting }]) => {
    if (isIntersecting) {
      callNext();
    }
  });

  useEffect(() => {
    if (paging.next === null) return;
    if (!spinnerRef.current) return;

    handleObserver.observe(spinnerRef.current);

    return () => {
      spinnerRef.current && handleObserver.unobserve(spinnerRef.current);
    };
  }, [paging]);

  return <React.Fragment>{children}</React.Fragment>;
};

InfinityScroll.defaultProps = {
  children: null,
  callNext: () => {},
  isNext: false,
  loading: false,
};

export default InfinityScroll;
