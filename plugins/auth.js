import md5 from 'js-md5'

export default function(ctx) {
      // if (process.server) {
      //       return
      // }
      // const clientId = process.env.client_id;
      // const clientSecret = process.env.client_secret;
      // var today = new Date();
      // var time = today.getTime();
      // let signature = md5(clientId+time+clientSecret);
      // ctx.$axios.interceptors.request.use(request => {
      //       if(!ctx.app.$auth.loggedIn){
      //             request.headers.common['Authorization'] = `${ctx.app.$cookies.get('local2')}`
      //             if(request.headers.common['Authorization'] === 'Bearer '){
      //                   const clientId = process.env.client_id;
      //                   const clientSecret = process.env.client_secret;
      //                   var today = new Date();
      //                   var time = today.getTime();
      //                   let signature = md5(clientId+time+clientSecret)
      //                   ctx.$axios.post('/authorization', 
      //                   {signature:signature, auth_time: time.toString()},
      //                   {
      //                         headers: { "X-GCB-ClientID": clientId }
      //                   }).then(result=>{
      //                         var date = new Date();
      //                         // let dataLocal2 = parseInt(result.data.data.expired_duration)*92/100
      //                         date.setTime(date.getTime()+(30*1000));
      //                         ctx.app.$cookies.set('local2',`Bearer ${result.data.data.token}`, {
      //                               path: '/',
      //                               expires:date,
      //                         })
      //                         request.headers.common['Authorization'] = `Bearer ${result.data.data.token}`
      //                   }).catch(e=>{
      //                   this.$auth.logout();
      //                   })
      //                   return request
      //             }
      //       }
      //       return request
      // },function (error) {
      //       console.log(error)
      // })
}