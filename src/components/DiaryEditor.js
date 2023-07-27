import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import MyHeader from "./MyHeader";
import MyButton from "./MyButton";
import { useNavigate } from "react-router-dom";
import EmotionItem from "./EmotionItem";
import { DiaryDispatchContext } from "./../App";
import { getStringDate } from "../util/date.js";
import { emotionList } from "../util/emotion";

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

const DiaryEditor = ({ isEdit, originData }) => {
  const contentRef = useRef();

  const [content, setContent] = useState("");
  const [emotion, setEmotion] = useState(3);
  const [date, setDate] = useState(getStringDate(new Date()));

  const navigate = useNavigate();

  const handleClickEmote = useCallback((emotion) => {
    setEmotion(emotion);
  }, []);

  //function when editing not New Diary (when isEdit & originData props changed)
  useEffect(() => {
    if (isEdit) {
      setDate(getStringDate(new Date(parseInt(originData.date))));
      setEmotion(originData.emotion);
      setContent(originData.content);
    }
  }, [isEdit, originData]);

  const { onCreate, onEdit, onRemove } = useContext(DiaryDispatchContext);

  const handleSubmit = () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }

    if (
      window.confirm(
        isEdit
          ? "Do you want to EDIT diary?"
          : "Do you want to CREATE new diary?"
      )
    ) {
      if (!isEdit) {
        onCreate(date, content, emotion);
      } else {
        onEdit(originData.id, date, content, emotion);
      }
    }
    console.log({ date, content, emotion });
    navigate("/", { replace: true }); //go back & disallow going back to the previously visited page( wrong page)
  };

  const handleRemove = () => {
    if (window.confirm("Are you sure to REMOVE this diary?")) {
      onRemove(originData.id);
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="DiaryEditor">
      <MyHeader
        headText={isEdit ? "Edit Diary" : "New Diary"}
        leftChild={
          <MyButton
            text={"<"}
            onClick={() => {
              navigate(-1);
            }}
          />
        }
        rightChild={
          isEdit && (
            <MyButton
              text={"delete"}
              type={"negative"}
              onClick={handleRemove}
            />
          )
        }
      />

      <section>
        <h4>Today's date?</h4>
        <div className="input-box">
          <input
            className="input_date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </section>
      <section>
        <h4>Emotion Today</h4>
        <div className="input_box emotion_list_wrapper">
          {emotionList.map((it) => (
            // <div key={it.emotion_id}> {it.emotion_descript} </div>
            <EmotionItem
              key={it.emotion_id}
              {...it}
              onClick={handleClickEmote}
              isSelected={it.emotion_id === emotion}
            />
          ))}
        </div>
      </section>

      <section>
        <h4>Diary Today</h4>
        <div className="input_box text_wrapper">
          <textarea
            placeholder="How was today?"
            ref={contentRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </section>

      <section>
        <div className="control_box">
          <MyButton text={"cancel"} onClick={() => navigate(-1)} />
          <MyButton
            text={"complete"}
            type={"positive"}
            onClick={handleSubmit}
          />
        </div>
      </section>
    </div>
  );
};

export default DiaryEditor;
