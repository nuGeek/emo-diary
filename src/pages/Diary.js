import { useContext, useEffect, useState } from "react";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DiaryStateContext } from "../App";
import { getStringDate } from "../util/date.js";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import { emotionList } from "../util/emotion";

const Diary = () => {
  const { id } = useParams();
  const diaryList = useContext(DiaryStateContext);
  const [data, setData] = useState();
  const navigate = useNavigate();


  useEffect(()=>{
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = `${id}th Emotion Diary`
  }, [])

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );
      console.log(targetDiary);

      if (targetDiary) {
        //When diary exists
        setData(targetDiary);
      } else {
        //when diary not exist
        alert("Sorry, no corresponding diary exist");
        navigate("/", { replace: true });
      }
    }
  }, [id, diaryList, navigate]);

  if (!data) {
    return <div className="DiaryPage"> Loading....</div>;
  } else {
    const curEmotionData = emotionList.find(
      (it) => parseInt(it.emotion_id) === parseInt(data.emotion)
    );
    console.log(curEmotionData);

    return (
      <div className="DiaryPage">
        <MyHeader
          headText={`Diary record: ${getStringDate(new Date(data.date))} `}
          leftChild={<MyButton text={"<"} onClick={() => navigate(-1)} />}
          rightChild={
            <MyButton
              text={"edit"}
              onClick={() => navigate(`/edit/${data.id}`)}
            />
          }
        />
        <article>
          <section>
            <h4>Emotion Today</h4>
            <div
              className={[
                "diary_img_wrapper",
                `diary_img_wrapper_${data.emotion}`,
              ].join(" ")}
            >
              <img src={curEmotionData.emotion_img} alt="" />
              <div className="emotion_descript">
                {curEmotionData.emotion_descript}
              </div>
            </div>
          </section>
          <section>
            <h4>Diary Today</h4>
            <div className="diary_content_wrapper" >
              <p>{data.content}</p>
            </div>
          </section>
        </article>
      </div>
    );
  }
};

export default Diary;
