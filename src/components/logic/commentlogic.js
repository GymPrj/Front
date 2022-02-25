const Comment = () => {
    const onClick = async () => {
      const postData = {
        content: [],
      };
//   등록하기
      await axios
        .post('comment/trainer/${trainerid}', postData)
        .then(function (response) {
          console.log(response, '성공');
        })
        .catch(function (err) {
          console.log(err);
        });
    };
    // 지우기
    // await axios
    //     .delete('comment/${trainerid}/trainer', postData)
    //     .then(function (response) {
    //       console.log(response, '성공');
    //     })
    //     .catch(function (err) {
    //       console.log(err);
    //     });
    // };
    // 수정하기
    // await axios
    //     put.('comment/${trainerid}/trainer', postData)
    //     .then(function (response) {
    //       console.log(response, '성공');
    //     })
    //     .catch(function (err) {
    //       console.log(err);
    //     });
    // 
    // 코멘트 불러오기
    // await axios
    //     get.('comment/${trainerid}/trainer', postData)
    //     .then(function (response) {
    //       console.log(response, '성공');
    //     })
    //     .catch(function (err) {
    //       console.log(err);
    //     });
}