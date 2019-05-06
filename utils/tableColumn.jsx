import * as React from 'react';
import view from './img/view_img.svg';

const sexList = {
  MALE: '男',
  FEMALE: '女',
};

const titleList = {
  CHIEF_PHYSICIAN: '主任医师',
  ASSOCIATE_CHIEF_PHYSICIAN: '副主任医师',
  ATTENDING_PHYSICIAN: '主治医师',
  RESIDENT_PHYSICIAN: '住院医师',
};

const doctorList = {
  DOCTORAL_TUTOR: '博导',
  MASTER_TUTOR: '硕导',
};

const sex = {
  title: '性别',
  dataIndex: 'sex',
  key: 'sex',
  render: (text) => (
    <span>{sexList[text]}</span>
  ),
};

const title = {
  title: '职称',
  dataIndex: 'title',
  key: 'title',
  render: (text) => (
    <span>
      {titleList[text]}
    </span>
  ),
};

const doctor = {
  title: '导师',
  dataIndex: 'doctorTutor',
  key: 'doctorTutor',
  render: (text) => (
    <span>{doctorList[text]}</span>
  ),
};

const avatar = {
  title: '头像',
  dataIndex: 'avatar',
  key: 'avatar',
  render: text => (<img className="column-avatar" src={text} alt="" />),
};

const name = (role) => ({
  title: '姓名',
  dataIndex: role === 'doctor' ? 'name' : 'operatorName',
  key: 'name',
});

const cert = (self) => ({
  title: '查看资质',
  key: 'action',
  render: (text, record) => (
    <a className="column-view" onClick={() => self.viewImage(record.cert)}>
      <img src={view} />查看资质
    </a>
  ),
});

const rate = (text) => (<span>{text}%</span>);

const ratesColumn = [
  {
    title: '及时率',
    dataIndex: 'timelyRate',
    key: 'timelyRate',
  }, {
    title: '达标率',
    dataIndex: 'standardRate',
    key: 'standardRate',
  }, {
    title: '会诊完成率',
    dataIndex: 'completionRate',
    key: 'completionRate',
  },
];

const doctorColumns = (self, role) => {
  return [
    avatar, name(role), sex, doctor, title,
    ...ratesColumn.map(({ title, dataIndex, key }) => ({
      title, dataIndex, key, render: rate,
    })),
    {
      title: '投诉次数',
      dataIndex: 'appeal',
      key: 'appeal',
    },
    cert(self),
  ];
};

const nurseColumns = (self, role) => {
  return [
    avatar, name(role), sex,
    {
      title: '工单数',
      dataIndex: 'workOrderNumber',
      key: 'workOrderNumber',
    },
    cert(self),
  ];
};

export {
  sexList,
  doctorList,
  titleList,
  doctorColumns,
  nurseColumns,
};
