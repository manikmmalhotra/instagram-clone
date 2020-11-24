import { Button, Input, makeStyles, Modal } from '@material-ui/core';
import { useState, useEffect} from 'react';
import './App.css';
import { auth, db } from './firebase';
import ImageUpload from './ImageUpload';
import Post from './Post';
import InstagramEmbed from "react-instagram-embed";

  function getModalStyle() {
    const top = 50 ;
    const left = 50 ;

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

function App() {
  const [modalStyle] = useState(getModalStyle);
  const classes = useStyles();
  const [posts, setPosts] = useState([ ]);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user,setUser] = useState(null);
  const [openSignIn, setOpenSignIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser)=>{
      if(authUser){
          console.log(authUser);
          setUser(authUser);
          if(authUser.displayName) {

          } else {
            return authUser.updateProfile({
              displayName: username,
            });
          }
      }
      else{
          setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user, username]);

  useEffect(()=>{
    db.collection('posts').orderBy("timestamp", "desc").onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc =>({
        id: doc.id,
        post: doc.data()
      })));
    })
  },[]);

  const signup = (event) => {
    event.preventDefault();
    auth.createUserWithEmailAndPassword(email,password).then((authUser) => {
      authUser.user.updateProfile({
        displayName: username
      })
    }).catch((error) => alert(error.message));
    setOpen(false);
  };

  const signin = (event) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email,password).catch((error) => alert(error.message))

    setOpenSignIn(false);
  }

  return (
    <div className="app">

    <Modal
        open={open}
        onClose={() => setOpen(false)}
        
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app_signup">
          <center>
          <img className ="app__headerImage" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="" />
           </center>
          <Input placeholder="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          <Input placeholder="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button onClick={signup}>Sign Up</Button>
          </form>
      
       </div>

    </Modal>

    <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
        
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app_signup">
          <center>
          <img className ="app__headerImage" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="" />
           </center>
          <Input placeholder="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button onClick={signin}>Sign In</Button>
          </form>
      
       </div>

    </Modal>


      <div className="app__header">
        <img className ="app__headerImage" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="" />
      

      {user ? (
          <Button onClick={() => auth.signOut()} >Logout</Button>
      ): (
        <div className="app__loginContainer">
        <Button onClick={() => setOpen(true)}>Sign Up</Button>
        <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
        </div>
        )}
        </div>
        <div className="app__posts">
        <div className="app__postsLeft">
            {posts.map(({ id, post }) => (
              <Post
                user={user}
                key={id}
                postid={id}
                username={post.username}
                caption={post.caption}
                imageUrl={post.imageUrl}
              />
            ))}
        </div>
        <div className="app__postsRight">
          <InstagramEmbed
            url="https://www.instagram.com/p/B_uf9dmAGPw/"
            maxWidth={320}
            hideCaption={false}
            containerTagName="div"
            protocol=""
            injectScript
            onLoading={() => {}}
            onSuccess={() => {}}
            onAfterRender={() => {}}
            onFailure={() => {}}
          />
        </div>
      </div>


        {user?.displayName ? (
                <div className="app__upload">
                  <ImageUpload username={user.displayName} />
                </div>
              ) : (
                <center>
                  <h3>Login to upload</h3>
                </center>
              )} 

     

    </div>
  );
}

export default App;
