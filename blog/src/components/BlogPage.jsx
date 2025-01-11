import React, { useEffect, useState } from "react";
import BlogCards from "./BlogCards";
import Pagination from "./Pagination";
import CategorySelection from "./CategorySelection";
import SideBar from "./SideBar";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [activeCategory, SetactiveCategory] = useState(null);

  useEffect(() => {
    async function fetchBlogs() {
      let url = `http://localhost:5000/blogs?page=${currentPage}&limit=${pageSize}`;

      if (selectedCategory) {
        url += `&category=${selectedCategory}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      setBlogs(data);
      console.log(data);
    }
    fetchBlogs();
  }, [currentPage, selectedCategory, pageSize]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    SetactiveCategory(category);
  };

  return (
    <div>
      <div>
        <CategorySelection
          onSelectCategory={handleCategoryChange}
          selectedCategory={selectedCategory}
          activeCategory={activeCategory}
        />
      </div>

      {/**blog */}
      <div className="flex flex-col lg:flex-row gap-12">
        <BlogCards
          blogs={blogs}
          currentPage={currentPage}
          selectedCategory={selectedCategory}
          pageSize={pageSize}
        />
        <div>
          <SideBar />
        </div>
      </div>

      {/**pagination */}
      <div>
        <Pagination
          blogs={blogs}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          pageSize={pageSize}
        />
      </div>
    </div>
  );
};

export default BlogPage;
