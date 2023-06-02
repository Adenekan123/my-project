import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { updatePost, fetchPost } from "../features/post/postSlice";

import { Header } from "../components/Header";
import { Aside } from "../components/Aside";
import { Main } from "../components/Main";
import { Container } from "../components/Container";

const initialState = {
  title: "",
  body: "",
  image: "",
  pdf: "",
};

const Editpost = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isLoading, posts, error } = useSelector((store) => store.posts);

  const [inputs, setInputs] = useState(initialState);

  const updateinputs = function (e) {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileUpload = (event) => {
    const { name, files } = event.target;
    setInputs({ ...inputs, [name]: files[0] });
  };
  const updateBody = function (value) {
    setInputs((prev) => ({ ...prev, body: value }));
  };

  const onSubmit = function (e) {
    e.preventDefault();
    if (inputs.title === "" || inputs.body === "")
      return alert("Please enter all fields");
    dispatch(updatePost(id, { ...inputs }));
  };
  

  useEffect(() => {
    dispatch(fetchPost(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (posts.length) {
      setInputs({...posts[0],pdf:'',image:''});
    }
  }, [posts]);

  return (
    <>
      <Header />
      <Container>
        <Aside />
        <Main>
          {isLoading ? (
            <h1>Loading...</h1>
          ) : (
            <div className=" w-100 bg-secondary flex justify-center items-center p-4 md:p-0">
              <div className=" w-full">
                <div className="bg-white rounded shadow">
                  <div className="card-header px-6 py-4 border-b">
                    {error ? (
                      <div class="p-4 bg-red-200 text-red-800">{error}</div>
                    ) : (
                      ""
                    )}
                    <h2 className="font-semibold text-gray-700 uppercase text-center">
                      Update Post
                    </h2>
                  </div>
                  <form onSubmit={onSubmit} className="md:grid grid-cols-12 gap-3 card-body p-6">
                    <div className="mb-6 col-span-12">
                      <label
                        htmlFor="username"
                        className="block mb-3 font-semibold"
                      >
                        Title:
                      </label>
                      <input
                        type="text"
                        className=" w-full border rounded px-6 py-4"
                        placeholder="Enter title"
                        name="title"
                        value={inputs.title}
                        onChange={updateinputs}
                      />
                      <span></span>
                    </div>

                    <div className=" mb-10 col-span-12">
                      <label
                        htmlFor="password"
                        className="block mb-3 font-semibold"
                      >
                        Body:
                      </label>
                      <ReactQuill value={inputs.body} onChange={updateBody} />
                    </div>
                    <div className=" mb-10 col-span-12">
                      <label
                        htmlFor="image"
                        className="block mb-3 font-semibold"
                      >
                        Picture:
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        className=" w-full border rounded px-6 py-4"
                        name="image"
                        onChange={handleFileUpload}
                      />
                    </div>
                    <div className=" mb-10 col-span-12">
                    <label htmlFor="image" className="block mb-3 font-semibold">
                      PDF:
                    </label>
                    <input
                      type="file"
                      accept="application/pdf"
                      className=" w-full border rounded px-6 py-4"
                      name="pdf"
                      onChange={handleFileUpload}
                    />
                  </div>
                    <div className="text-center col-span-12">
                      <button
                        className="bg-primary hover:bg-gray-700 px-6 py-3 capitalize rounded font-medium text-white"
                        type="submit"
                      >
                        Update
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </Main>
      </Container>
    </>
  );
};

export default Editpost;
