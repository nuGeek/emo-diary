import React, { useContext, useEffect, useState } from "react";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import { DiaryStateContext } from "../App";
import DiaryList from "../components/DiaryList";

const Home = () => {
  const diaryList = useContext(DiaryStateContext);
  const [data, setData] = useState([]);
  const [curdate, setCurdate] = useState(new Date());
  // console.log(curdate);

  const headText = `${curdate.getFullYear()} . ${curdate.getMonth() + 1}`;

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `Emotion Diary`;
  }, []);

  useEffect(() => {
    if (diaryList.length >= 1) {
      //to get list of diaries between first and last day of the month
      const firstDay = new Date(
        curdate.getFullYear(),
        curdate.getMonth(),
        1
      ).getTime();
      const lastDay = new Date(
        curdate.getFullYear(),
        curdate.getMonth() + 1,
        0,
        23,
        59,
        59
      );

      setData(
        diaryList.filter((it) => firstDay <= it.date && it.date <= lastDay)
      );
    }
  }, [diaryList, curdate]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const increaseMonth = () => {
    setCurdate(
      new Date(curdate.getFullYear(), curdate.getMonth() + 1, curdate.getDate())
    );
  };

  const decreaseMonth = () => {
    setCurdate(
      new Date(curdate.getFullYear(), curdate.getMonth() - 1, curdate.getDate())
    );
  };
  return (
    <div>
      <MyHeader
        headText={headText}
        leftChild={<MyButton text={"<"} onClick={decreaseMonth} />}
        rightChild={<MyButton text={">"} onClick={increaseMonth} />}
      />

      <DiaryList diaryList={data} />
    </div>
  );
};

export default Home;
