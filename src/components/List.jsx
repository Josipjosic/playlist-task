import React from "react";
import { useEffect, useState } from "react";

var cors_api_host = "https://api.allorigins.win/raw?url=";
var cors_api_url = "https://api.deezer.com/chart";

const List = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${cors_api_host}${cors_api_url}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });
      response.json().then((data) => {
        setList(data.tracks.data);
      });
    };

    fetchData()
  }, []);

  //if (!list.length) return <h3>Loading..</h3>

  console.log(list);

  return (
    <div>
      <div>Most Popular</div>
      <div>
          {list.map((item) => {return <p key={item.id}> {item.title}</p>})}
      </div>
    </div>
  );
};

export default List;
