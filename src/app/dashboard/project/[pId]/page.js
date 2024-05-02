"use client";
import { Mentions } from "antd";
import axios from "axios";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
const Page = ({ params }) => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const ref = useRef();
  const loadGithubUsers = (key) => {
    if (!key) {
      setUsers([]);
      return;
    }
    fetch(`https://api.github.com/search/users?q=${key}`)
      .then((res) => res.json())
      .then(({ items = [] }) => {
        if (ref.current !== key) return;
        setLoading(false);
        setUsers(items.slice(0, 10));
      });
  };

  const onSearch = (search) => {
    console.log("Search:", search);
    ref.current = search;
    setLoading(!!search);
    setUsers([]);
    debounceLoadGithubUsers(search);
  };
  console.log(params);

  const [singleTask, setSingleTask] = useState({});
  useEffect(() => {
    axios
      .get(`https://6630ec7fc92f351c03db97ac.mockapi.io/tasks/${params?.pId}`)
      .then((res) => {
        setSingleTask(res.data);
      })
      .catch((err) => console.log(err.message));
  }, [params]);
  console.log(singleTask);
  return (
    <section className="pr-3">
      <div>
        <div className="bg-sky-700 h-52 w-full rounded-xl relative">
          <Image
            width={100}
            height={100}
            className="rounded-full w-20 h-20 border-4 object-cover absolute -bottom-10 left-4"
            src={singleTask.photo}
            alt="image"
          />
        </div>
        <h1 className="text-3xl font-bold ml-28"> {singleTask?.projectName}</h1>
      </div>
      <div className="w-1/4">
        <h2 className="text-xl font-bold mr-20">Assign Task</h2>
        <div>
          <Mentions
            style={{
              width: "100%",
            }}
            loading={loading}
            onSearch={onSearch}
            options={users.map(({ login, avatar_url: avatar }) => ({
              key: login,
              value: login,
              className: "antd-demo-dynamic-option",
              label: (
                <>
                  <Image width={40} height={40} src={avatar} alt={login} />
                  <span>{login}</span>
                </>
              ),
            }))}
          />
        </div>
      </div>
    </section>
  );
};

export default Page;
