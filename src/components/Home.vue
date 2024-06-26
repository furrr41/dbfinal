<template>
  <div class="home">
    <!-- 页面头部 -->
    <header>
      <!-- 菜单图标 -->
      <img src="@/assets/fflogo.png" alt="Logo" class="minilogo" />
      <!-- 导航菜单 -->
      <nav class="nav-container">
        <ul>
          <li><router-link to="/film-rating-list">Film rating list</router-link></li>
          <li><router-link to="/films">Films</router-link></li>
          <li><router-link to="/actors">Actors</router-link></li>
          <li><router-link to="/search">Search</router-link></li>
        </ul>
      </nav>
      <!-- 用户账户信息 -->
      <div class="account">
        <a v-if="!user" href="#" @click="$router.push('/register')">Do not have an account yet?</a>
        <div v-if="user" class="profile">
          <!-- 用户头像 -->
          <img src="@/assets/logo.png" alt="Profile" />
          <span>{{ user.userName }}</span>
          <button @click="logout">Logout</button>
        </div>
      </div>
    </header>

    <!-- 增加背景颜色的区域 -->
    <div class="content-background">
      <!-- 页面主体 -->
      <main>
        <!-- 内容容器，限制宽度 -->
        <div class="content">
          <!-- 欢迎部分 -->
          <div class="welcome">
            <!-- 网站标志 -->
            <img src="@/assets/fflogo.png" alt="Logo" class="logo" />
            <!-- 登录和访客链接 -->
            <div class="links">
              <a href="#" @click.prevent="goToLogin" class="login">Log in</a>
              <a href="#" @click.prevent="goToRegister" class="visitor">visitor</a>
            </div>
            <p>Explore every quality movie.</p>
            <a href="#" class="scroll">Scroll to more</a>
          </div>
          <!-- 精选电影部分 -->
          <div class="featured-movie">
            <img src="@/assets/Macbook@2x.png" alt="Macbook">
            <div class="screen">
              <img src="@/assets/screenpic.jpg" alt="Screen Pic">
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- 3.精品推荐模块开始 -->
    <div class="goods content">
      <p>精品影片推荐</p>
    </div>
    <!-- 精品推荐模块结束 -->
    <div class="films content">
      <ul>
        <li v-for="film in topRatedMovies" :key="film.workId">
          <img src="@/assets/poster.jpg" alt="" /><br />
          影片：{{film.title}} <br />
          评分：{{film.rating}} <br />
          ID：{{film.workId}} <br />
        </li> <br />
      </ul>
    </div>

    <!-- 添加导航按钮 -->
    <div class="navigation-button">
      <el-button type="primary" @click="navigateToZSGC">增删改功能</el-button>
    </div>
  </div>
</template>

<script>
  // 引入 API 模块
  import api from '@/api/api';

  export default {
    name: 'Home',
    data() {
      return {
        // 存储评分最高的电影数据
        topRatedMovies: [],
        user: JSON.parse(localStorage.getItem('user')) || null // 从localStorage获取用户信息
      };
    },
    created() {
      console.log("Home组件被创建了，好玩吗？我快死了。")
      // 组件创建时调用方法获取评分最高的电影数据
      this.fetchTopRatedMoviesforHome();
    },
    methods: {
      // 调用 API 获取评分最高的电影数据的方法
      fetchTopRatedMoviesforHome() {
        api.getTopRatedMovies2()
          .then(response => {
            // 将返回的数据存储在 topRatedMovies 中
            this.topRatedMovies = response.data;
            console.log(this.topRatedMovies); // 添加这一行来查看获取到的数据
          })
          .catch(error => {
            console.error('Error fetching top rated movies:', error);
          });
      },
      // 导航到登录页面的方法
      goToLogin() {
        this.$router.push('/login');
      },
      // 导航到注册页面的方法
      goToRegister() {
        this.$router.push('/register');
      },
      logout() {
        localStorage.removeItem('user');
        this.user = null;
        this.$router.push('/login');
      },
      // 导航到增删改页面的方法
      navigateToZSGC() {
        this.$router.push('/zsgc');
      }
    },
    watch: {
      '$route'(to, from) {
        this.user = JSON.parse(localStorage.getItem('user')) || null;
      }
    }
  };
</script>

<style scoped>
  /* 全局重置样式 */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    /* 确保所有元素的边距和内边距被包含在元素的总宽度和高度内 */
  }

  /* 整体页面样式 */
  .home {
    font-family: Arial, sans-serif;
  }

  /* 页眉样式 */
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background: #fff;
  }

  /* 导航菜单容器样式 */
  .nav-container {
    flex: 1;
    display: flex;
    justify-content: center;
  }

  /* 导航菜单样式 */
  nav ul {
    list-style: none;
    display: flex;
    justify-content: space-around;
    width: 60%;
  }

  nav a {
    font-size: 16px;
    text-decoration: none;
    color: #555;
    padding: 5px;
    transition: color 0.3s, border-bottom 0.3s;
    /* 添加过渡效果 */
  }

  nav a:hover {
    color: #8a2be2;
    /* 悬停时字体变色 */
    border-bottom: 2px solid #8a2be2;
    /* 悬停时添加底部边框 */
  }

  /* 用户账户链接和头像容器样式 */
  .account {
    display: flex;
    align-items: center;
    gap: 10px;
    /* 调整链接和头像之间的间距 */
  }

  .account a {
    color: #8a2be2;
    text-decoration: none;
  }

  .profile {
    display: flex;
    align-items: center;
    gap: 10px;
    /* 调整头像和文本之间的间距 */
  }

  .profile img {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    background-color: #d8d8d8;
    /* 设置背景颜色，以便更好地显示圆形 */
    padding: 5px;
    /* 调整内边距 */
  }

  /* 增加背景颜色的区域样式 */
  .content-background {
    background-color: #e5e7f9;
    /* 设置背景颜色 */
    padding: 50px 0;
    /* 添加上下内边距 */
    width: 100vw;
    /* 设置宽度占满视口宽度 */
    margin-left: -50vw;
    /* 确保内容居中对齐 */
    left: 50%;
    /* 确保内容居中对齐 */
    position: relative;
  }

  /* 主体内容样式 */
  main {
    display: flex;
    justify-content: center;
  }

  /* 内容容器样式，限制最大宽度 */
  .content {
    display: flex;
    justify-content: space-between;
    max-width: 1300px;
    width: 100%;
    padding: 0 20px;
  }

  /* 欢迎部分样式 */
  .welcome {
    max-width: 500px;
    text-align: center;
    /* 使内容居中对齐 */
  }

  /* 网站标志样式 */
  .welcome .logo {
    width: 100%;
    height: auto;
    margin-bottom: 20px;
    /* 添加底部外边距，使标志和按钮有间距 */
  }

  /* 链接容器样式 */
  .links {
    display: flex;
    justify-content: space-between;
    /* 链接之间的间距 */
    margin: 0 10px 30px 10px;
    width: 420px;
    /* 确保链接容器的宽度 */
  }

  /* 链接样式 */
  .links a {
    display: inline-block;
    width: 200px;
    /* 设置链接宽度 */
    height: 45px;
    /* 设置链接高度 */
    line-height: 45px;
    /* 设置行高，使文字垂直居中 */
    text-align: center;
    /* 设置文字水平居中 */
    text-decoration: none;
    font-size: 16px;
    /* 调整链接文字大小 */
    cursor: pointer;
    border-radius: 3px;
    /* 调整圆角 */
  }

  /* 登录链接样式 */
  .links .login {
    background: #8a2be2;
    color: #fff;
  }

  /* 访客链接样式 */
  .links .visitor {
    background: none;
    border: 1px solid #8a2be2;
    /* 调整边框样式 */
    color: #8a2be2;
  }

  /* 欢迎部分段落样式 */
  .welcome p {
    margin-left: 9px;
    font-size: 16px;
    color: #9a95b7;
    text-align: left;
  }

  /* 滚动链接样式 */
  .scroll {
    margin-left: 9px;
    color: #8a2be2;
    text-decoration: none;
    display: block;
    margin-top: 20px;
    text-align: left;
  }

  /* 精选电影图片样式 */
  .featured-movie {
    position: relative;
    max-width: 700px;
    /* 设置容器最大宽度 */
    width: 100%;
  }

  .featured-movie img {
    width: 100%;
  }

  .screen {
    position: absolute;
    top: 2.7%;
    left: 12.4%;
    width: 525px;
    height: 315px;
  }

  .screen img {
    width: 100%;
    height: 100%;
    border-radius: 3px;
    /* 设置图片圆角 */
  }

  .minilogo {
    height: 50px;
  }

  .account>a:hover {
    text-decoration: underline;
  }

  .goods {
    height: 60px;
    background-color: #fff;
    margin: 10px auto;
    box-shadow: 0 2px 3px 3px rgba(0, 0, 0, 0.1);
    /* 行高会继承， 会继承给3个孩子 */
    line-height: 60px;
    text-align: center;
  }

  .films {
    /* background-color: pink; */
    margin: 30px auto;
  }

  .films ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0;
    list-style: none;
    gap: 20px;
    /* 添加 gap 属性来设置每个盒子之间的间隙 */
  }

  .films li {
    flex: 1 0 30%;
    /* 确保每个盒子占据三分之一的宽度，允许自动调整 */
    max-width: calc(33.3333% - 20px);
    /* 确保每个盒子的宽度，并减去间隙 */
    box-sizing: border-box;
    background-color: #fff;
    padding: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    text-align: center;
  }

  .films img {
    max-width: 100%;
    height: auto;
    border-radius: 5px;
  }

  .films li h3 {
    margin: 10px 0;
  }

  .films li span {
    color: red;
    font-weight: bold;
    font-size: 1.2em;
  }

  @media (max-width: 768px) {
    .films li {
      flex: 1 0 45%;
      /* 在小屏幕设备上，每行展示两个盒子 */
    }
  }

  @media (max-width: 480px) {
    .films li {
      flex: 1 0 100%;
      /* 在更小的屏幕设备上，每行展示一个盒子 */
      margin-bottom: 20px;
      /* 为小屏幕设备添加底部间隙 */
    }
  }

  .navigation-button {
    text-align: center;
    margin-top: 20px;
  }
</style>
