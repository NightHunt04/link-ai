import { useEffect, useState } from "react";
import { onValue, ref, get } from "firebase/database"
import { db } from "@/config/firebaseConfig";
import Cookies from "universal-cookie"

const useUserPosts = () => {
  const [userPosts, setUserPosts] = useState(null);

  useEffect(() => {
    const cookies = new Cookies(null, { path: "/" });
    // console.log('username', cookies.get("user_email").split('@')[0])
    const postRef = ref(db, `post-data/`);
    
    get(postRef)
      .then((snapshot) => {
        if (snapshot.exists() && cookies.get("user_email")) {
          setUserPosts(snapshot.val()[cookies.get("user_email").split('@')[0]])
        } else {
          console.log('no data available')
        }
      })
      .catch((err) => {
        console.error(err)
      })

    const unsubscribe = onValue(postRef, (snapshot) => {
      const data = snapshot.val()
      setUserPosts(data[cookies.get("user_email").split('@')[0]]);
    });

    return () => unsubscribe()
  }, []);

  return userPosts;
};

export default useUserPosts