import md5 from "js-md5";
// const clientId = process.env.client_id;
// const clientSecret = process.env.client_secret;
// var today = new Date();
// var time = today.getTime();
// let signature = md5(clientId+time+clientSecret)
export default function({ app, $axios, $auth, route, redirect, store }) {
  $axios.onRequest(config => {
    if ($auth.loggedIn) {
      // config.headers.common["Authorization"] = $auth.getToken("local").token;
      $axios.setHeader("Authorization", $auth.getToken("local").token);
      $auth.ctx.app.$axios.setHeader(
        "Authorization",
        $auth.getToken("local").token
      );
    }
    // else{
    // config.headers.common['Authorization'] = `${app.$cookies.get('local2')}`
    // $axios.post('/authorization',
    //   {signature:signature, auth_time: time.toString()},
    //   {
    //     headers: { "X-GCB-ClientID": clientId }
    //   }).then(result=>{
    //     console.log(result.data.data)
    //     var date = new Date();
    //     // let dataLocal2 = parseInt(result.data.data.expired_duration)*92/100
    //     date.setTime(date.getTime()+(30*1000));
    //     // date.setTime(date.getTime()+(dataLocal2*1000));
    //     app.$cookies.set('local2',`Bearer ${result.data.data.token}`, {
    //       path: '/',
    //       expires:date,
    //     })
    //     config.headers.common['Authorization'] = `Bearer ${result.data.data.token}`
    //   }).catch(e=>{
    //     this.$auth.logout();
    //   })
    // config.headers.common['Authorization'] = `${app.$cookies.get('local3')}`
    // }
  });
  // $axios.onResponse(response => {
  //   console.log('response',response.data.data)
  //   if(response.data.data.statusCode === 403) {
  //     const originalRequest = response.config
  //     originalRequest._retry = true
  //     $axios.post('/authorization',
  //       {signature:signature, auth_time: time.toString()},
  //       {
  //         headers: { "X-GCB-ClientID": clientId }
  //       }).then(result=>{

  //         var date = new Date();
  //         // let dataLocal2 = parseInt(result.data.data.expired_duration)*92/100
  //         date.setTime(date.getTime()+(360 * (24 * 60 * 60 * 1000)));
  //         // date.setTime(date.getTime()+(dataLocal2*1000));
  //         app.$cookies.set('local2',`Bearer ${result.data.data.token}`, {
  //           path: '/',
  //           expires:date,
  //         })
  //         originalRequest.headers.common['Authorization'] = `Bearer ${result.data.data.token}`
  //         $axios(originalRequest).then(data => {
  //           return data
  //         })
  //     }).catch(e=>{
  //       this.$auth.logout();
  //     })

  //   }
  // })
  if (!$auth.loggedIn) {
    if (route.fullPath == "/tai-khoan") {
      return redirect("/");
    }
  }else{
    if(route.fullPath == "/landing-page/dang-ky"){
      return redirect("/");
    }
  }
}
