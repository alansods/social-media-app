<template>
  <div id="home">
    <div class="newpost">
      <h2>Bem vindo de volta!</h2>
      <span>Compartilhe seu dia</span>
      <textarea
        placeholder="O que está fazendo hoje?"
        rows="15"
        v-model="input"
      >
      </textarea>
      <button @click="createPost">Compartilhar</button>
    </div>

    <div class="postarea loading" v-if="loading">
      <h2>Buscando posts...</h2>
    </div>

    <div class="postarea" v-else>
      <article class="post" v-for="post in posts" :key="post.id">
        <h1>{{ post.autor }}</h1>
        <p>{{ post.content | postLength }}</p>
        <div class="action-post">
          <button @click="likePost(post.id, post.likes)">
            {{ post.likes === 0 ? "Curtir" : post.likes + " Curtidas" }}
          </button>
          <button>Veja post completo</button>
          <button>Deletar post</button>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import firebase from '@/services/firebaseConnection';

export default {
  name: "Home",
  data() {
    return {
      input: "",
      user: {},
      loading: true,
      posts: [],
    }
  },
  async created() {
    const user = localStorage.getItem("SocialApp");
    this.user = JSON.parse(user);

    await firebase.firestore().collection('posts')
    .orderBy('created', 'desc')
    .onSnapshot((doc)=>{
      this.posts = [];

      doc.forEach((item)=>{
        this.posts.push({
          id: item.id,
          autor: item.data().autor,
          content: item.data().content,
          likes: item.data().likes,
          created: item.data().created,
          userId: item.data().userId,
        });
      })

      this.loading = false;
    })

  },
  methods: {
    async createPost() {
      if (this.input === "") {
        return;
      }

      await firebase.firestore().collection("posts")
      .add({
        created: new Date(),
        content: this.input,
        autor: this.user.nome,
        userId: this.user.uid,
        likes: 0,
      })
      .then(()=> {
        this.input = '';
        console.log('Post criado com sucesso.');
      })
      .catch((error)=> {
        console.log('Post criado com sucesso.' + error);
      })
    },
    async likePost(id, likes){
      const userId = this.user.uid;
      const docId = `${userId}_${id}`;

      //checando se post foi curtido

      const doc = await firebase.firestore().collection('likes')
      .doc(docId).get()

      if(doc.exists){
        await firebase.firestore().collection('posts')
        .doc(id).update({
          likes: likes - 1
        })

      await firebase.firestore().collection('likes')
      .doc(docId).delete();
      return;
      }

      await firebase.firestore().collection('likes')
      .doc(docId).set({
        postId: id,
        userId: userId,
      })

      //criar like
      await firebase.firestore().collection('posts')
      .doc(id).update({
        likes: likes + 1
      })

    }
  },
  filters: {
    postLength(valor){
      if(valor.length < 200) {
        return valor;
      }
      return `${valor.substring(0,200)}...`
    }
  }
};
</script>

<style scoped>
#home {
  display: flex;
  flex-direction: row;
  margin: 25px;
}

@import "./home.css";
</style>
