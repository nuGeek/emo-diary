import React from "react";
import MyButton from "./MyButton";
import { useNavigate } from "react-router-dom";

const DiaryItem = ({ id, emotion, content, date }) => {
  const navigate = useNavigate();

  const strDate = new Date(parseInt(date)).toLocaleDateString();
  const goDetail = () => {
    navigate(`/diary/${id}`);
  };
  const goEdit = () => {
    navigate(`/Edit/${id}`);
  };
  return (
    <div className="DiaryItem">
      <div
        onClick={goDetail}
        className={[
          "emotion_img_wrapper",
          `emotion_img_wrapper_${emotion}`,
        ].join(" ")}
      >
        <img
          src={process.env.PUBLIC_URL + `assets/emotion${emotion}.png`}
          alt="emotion"
        />
      </div>
      <div className="info_wrapper" onClick={goDetail}>
        <div className="diary_date"> {strDate}</div>
        <div className="diary_content_preview"> {content.slice(0, 25)}</div>
      </div>
      <div className="btn_wrapper">
        <MyButton text={"edit"} onClick={goEdit} />
      </div>
    </div>
  );
};

export default React.memo(DiaryItem);
