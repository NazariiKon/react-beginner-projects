import React, { useEffect, useState } from "react";
import "./index.scss";
import { Collection } from "./Collection";

function App() {
  const [collections, setCollections] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const [activePage, setActivePage] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const category = categoryId ? `category=${categoryId}` : "";
    fetch(
      `https://687a2441abb83744b7eb9fac.mockapi.io/test/collections?page=${
        activePage + 1
      }&limit=3&${category}`
    )
      .then((res) => res.json())
      .then((json) => setCollections(json))
      .catch((err) => {
        console.warn(err);
        alert("Error while loading data1");
      })
      .finally(() => setIsLoading(false));
  }, [categoryId, activePage]);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://687a2441abb83744b7eb9fac.mockapi.io/test/categories")
      .then((res) => res.json())
      .then((json) => setCategories(json))
      .catch((err) => {
        console.warn(err);
        alert("Error while loading data2");
      })
      .finally(() => setIsLoading(false));
  }, []);

  // const handleOnCategoryClick = (index) => {
  //   setCategoryId(index);
  // };

  // const handleOnSearchChange = (event) => {
  //   setSearchValue(event.target.value);
  // };

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {categories.map((category, index) => (
            <li
              onClick={() => setCategoryId(index)}
              className={categoryId === index ? "active" : ""}
              key={category.name}
            >
              {category.name}
            </li>
          ))}
        </ul>
        <input
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          className="search-input"
          placeholder="Поиск по названию"
        />
      </div>
      <div className="content">
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          collections
            .filter((collection) =>
              collection.name.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((collection) => (
              <Collection
                key={collection.name}
                name={collection.name}
                images={collection.photos}
              />
            ))
        )}
      </div>
      <ul className="pagination">
        {[...Array(3)].map((_, i) => (
          <li
            onClick={() => setActivePage(i)}
            className={activePage === i ? "active" : ""}
          >
            {i + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
