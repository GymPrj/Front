import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const AdmingContainer = styled.div`
  padding: 100px 0;
  background-color: #f3f3f3;
  min-width: 1280px;
  & > section {
    width: 1280px;
    margin: 0 auto;
    padding: 16px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
      0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
    h1 {
      margin-bottom: 70px;
      font-size: 22px;
    }
  }
`;

const TableContainer = styled.div``;

const AdminPage = () => {
  const [pendingList, setPendingList] = useState();

  const acceptGym = () => {};

  const getPendingList = async () => {
    const url = 'findGymPending';

    await axios
      .get(`/admin/${url}`)
      .then(function (response) {
        console.log(response.data);
        const list = response.data.content;
        const lists = list.map(val => (
          <tr>
            <td>{val.gymName}</td>
            <td>{val.ceoName}</td>
            <td>{val.businessNumber}</td>
            <td>{val.city}</td>
            <td>{val.town}</td>
            <td>{val.detailAddress}</td>
            <td>{val.tel}</td>
            <td>
              <button type="button" onClick={() => acceptGym()}>
                승인하기
              </button>
            </td>
          </tr>
        ));
        setPendingList(lists);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  useEffect(() => {
    getPendingList();
  }, []);

  //   const onClick = async () => {
  //     const postData = {
  //       email: 'admin@naver.com',
  //       loginTypeId: 1,
  //       password: 'admin1',
  //     };

  //     await axios
  //       .post('/session/login', postData)
  //       .then(function (response) {
  //         console.log(response, '성공');
  //       })
  //       .catch(function (err) {
  //         console.log(err, postData);
  //       });
  //   };

  //   const onClick2 = async () => {

  //   const url = 'acceptGym';
  // const num = 5;
  // console.log(url);
  // await axios
  //   .post(`/admin/${url}/${num}`)
  //   .then(function (response) {
  //     console.log(response.data);
  //   })
  //   .catch(function (err) {
  //     console.log(err);
  //   });
  //   };

  return (
    <AdmingContainer>
      <section>
        <h1>승인 대기중인 헬스장 목록</h1>
        {/* <button type="button" onClick={onClick}>
        login
      </button>
      <button type="button" onClick={onClick2}>
        login2
      </button> */}

        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>헬스장명</th>
                <th>ceo이름</th>
                <th>사업자번호</th>
                <th>시</th>
                <th>구</th>
                <th>상세주소</th>
                <th>전화번호</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>{pendingList}</tbody>
          </table>
        </TableContainer>
      </section>
    </AdmingContainer>
  );
};

export default AdminPage;
