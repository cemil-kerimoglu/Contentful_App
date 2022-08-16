import React, { useEffect, useState } from "react";
import { client } from "../../App";
import ArticlesItem from "../../Components/ArticlesItem/articlesItem";
import Footer from "../../Layouts/Footer/footer";
import Header from "../../Layouts/Header/header";
import MainLayout from "../../Layouts/Main/main";

function ArticlesPage() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    client.getEntries().then(function (entries) {
      // logs the entry metadata
      //console.log(entry.fields.title);
      console.log(entries);
      setArticles(entries.items);
      // logs the field with ID title
      // console.log(entry.fields.productName);
    });
  }, []);

  let articlesHtml = articles.map((article) => {
    return <ArticlesItem key={article.fields.id} article={article} />;
  });

  return (
    <div>
      <Header />
      <MainLayout content={articlesHtml} />
      <Footer />
    </div>
  );
}

export default ArticlesPage;
