import { Container, Divider } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

const AboutView = () => (
  <>
    <Container>
      <h2>关于</h2>
      <p>
        <span role="img" aria-label="data">
          👨‍💻
        </span>{' '}
        数据取自学校官方网站{' '}
        <a href="https://canteen.sjtu.edu.cn/" rel="nofollow">
          canteens
        </a>{' '}
        |{' '}
        <a href="http://www.lib.sjtu.edu.cn/" rel="nofollow">
          libraries
        </a>
      </p>
      <p>
        <span role="img" aria-label="smile">
          😀
        </span>{' '}
        空旷优先，<b>余量</b>/总数
      </p>
      <p>
        <span role="img" aria-label="smile">
          🎨
        </span>{' '}
        <span style={{ color: '#4caf50' }}>人很少 </span>
        <span style={{ color: '#2196f3' }}>人少 </span>
        <span style={{ color: '#ff9800' }}>人多 </span>
        <span style={{ color: '#f44336' }}>人很多 </span>
        <span style={{ color: '#607d8b' }}>无效数据 </span>
      </p>
      <p>
        <span role="img" aria-label="bot">
          🤖
        </span>{' '}
        页面数据自动刷新
      </p>
      <h2>反馈</h2>
      <a href="https://github.com/SeanChao/libsjtu/issues">GitHub Issues</a>
      <p></p>
      <Divider />
      <p></p>
      <Link to="/">返回</Link>
    </Container>
  </>
);

export default AboutView;
