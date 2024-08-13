/*
Author: Martin Sang Do
Used this for the exercise Youtube songs
//v-bind:src="current_yt_video"
 */
const app = new Vue({
    el: "#vue_app",
    data: {
        show_popup: false,  //to show the popup
        current_yt_video: '',
        userInput: '',  //content of user input
        list: [     //list of data from database
        ]
    },
    mounted: function () {
        //this function is called after all DOM elements rendered in HTML page
        this.$nextTick(function () {
            this.fetchList();
        })
    },
    methods: {
        async fetchList() {
            const response = await fetch("http://localhost:3000/movie/yt/latest_songs");
            var response_json = await response.json();
            // this.list = response_json;
            //refine some data
            for (var i=0; i<response_json.length; i++){
                this.list.push({
                    id: response_json[i]['pId'],   //song id
                    name: response_json[i]['name'],
                    img: response_json[i]['img'].replace('default.', '0.'), //get better quality image
                    url: 'https://www.youtube.com/embed/' + response_json[i]['eId'].replace('/yt/', ''),   //youtube embedded url
                    uLink: '/movie/yt/author/' + response_json[i]['uId'],   //user profile page
                    uName: response_json[i]['uNm']
                });
            }
            console.log(this.list);
        },
        showPopup(yt_url) {
            this.show_popup = true;
            this.current_yt_video = yt_url;
        },
    }
});
