import React from "react";
import { useEffect, useState } from "react";
import style from "./List.module.scss";
import Modal from "./Modal";

var cors_api_host = "https://cors-anywhere.herokuapp.com/";
var cors_api_url = "https://api.deezer.com/chart";

const List = () => {
  const [list, setList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedId, setSelectedId] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${cors_api_host}${cors_api_url}`, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Headers": "Content-Type",
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      response.json().then((data) => {
        setList(data.tracks.data);
      });
    };

    fetchData();
  }, []);

  if (!list.length) return <h3>Loading..</h3>;

  const onChangeEvent = (event) => {
    const sorting = event.target.value;
    const copyList = [...list];

    copyList.sort((a, b) => {
      return sorting === "0"
        ? a.duration - b.duration
        : b.duration - a.duration;
    });
    setList(copyList);
  };

  console.log(list);

  const modalOpen = () => {
    setOpenModal(true);
  };

  const selectedSong = list.find((id) => id === selectedId)

  console.log(selectedSong)
  
  return (
    <div>
      <Modal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
      />
      <div className={style.background}>
        <h1>Top Pop</h1>
        <div className={style.titleBar}>Sort by</div>
        <div>
          <select defaultValue={0} onChange={onChangeEvent}>
            <option value="Sort" disabled>
              Sort
            </option>
            <option value={0}>Shortest</option>
            <option value={1}>Longest</option>
          </select>
        </div>
        <ul className={style.listStyle}>
          {list.map((item) => {
            return (
              <div>
                <li key={item.id} onClick={() => {setSelectedId(item)}}>
                  <div onClick={modalOpen} className={style.listContent}>
                    <img
                      className={style.listImg}
                      src={item.album.cover_medium}
                      alt={item.album.cover_medium}
                    ></img>
                    <div className={style.info}>
                      <h6>{item.artist.name}</h6>
                      <h5>{item.title}</h5>
                    </div>
                  </div>
                </li>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default List;
