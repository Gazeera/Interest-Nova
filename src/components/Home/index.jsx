import { Layout, Input, message, Card} from 'antd';
import styles from './layout.module.css';
import Results from '../Results';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const { Header, Content, Footer } = Layout;

const LayoutComponent = () => {

  const [query, setQuery] = useState(null);
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    

    ((async () => {
      if (query) {

        setLoading(true);

        try {

          const searchQuery = query.trim().split(" ").join("+");

          const res = await axios.get(`https://interest-nova-server.vercel.app/search?q=${searchQuery}`);

          if (res.data.success) {

            let newDataSource = res.data.data.data.map((item) => {
              return {
                key: uuidv4(),
                interest: item.name,
                audience_size: item.audience_size_upper_bound,
                topic: item.topic,
              }
            });

            setDataSource(newDataSource);

          }


        } catch (err) {
          message.error("Sorry, something went wrong!");
        }

        setLoading(false);

      }
    }))();

    
  }, [query]);

  return (
    <div>
      <Layout className="layout">
        <Header>
          <h1 className={styles.menu_header}>Facebook Hidden Interest🧭</h1>
        </Header>
        <Card style={{width: "100%"}}>
        <Content>
          <div className="site-layout-content">
            <Input.Search placeholder="Search a broad term or keyword..." onSearch={(e) => setQuery(e)} size="large" style={{ marginTop: "5%" }} allowClear enterButton="Search" />
            <Results tableData={dataSource} loading={loading} />
          </div>
        </Content>
        <div style={{marginTop: "1%", background: 'yellow', padding:".5%"}}><a href="https://istore.my.id" target="_blank" rel="noreferrer">Found This Useful? Help Me Build More Awesome Tools 🚀</a></div>
        </Card>
        <Footer style={{ textAlign: 'center' }}>Facebook Hidden Interest 🧭 ©{new Date().getFullYear()} | Created by <a href="https://t.me/albaspro" target="_blank" rel="noreferrer">Albaspro</a> </Footer>
      </Layout>
    </div>
  )
};

export default LayoutComponent;
