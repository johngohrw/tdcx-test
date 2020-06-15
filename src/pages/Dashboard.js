import React, { useState, useEffect } from "react";
import DashboardLayout from "../layouts/Dashboard";
import EmptyList from "../components/EmptyList";
import TaskItem from '../components/TaskItem';
import TaskAddModal from "../components/TaskAddModal";
import WidgetCompleted from "../components/WidgetCompleted";
import WidgetLatestTasks from "../components/WidgetLatestTasks";
import WidgetChart from "../components/WidgetChart";
import styles from "./Dashboard.module.scss";
import { Button, Input, notification, Spin } from "antd";
import { apiRequest } from "../utils/api";
import { getAuthConfig } from "../utils/auth";
import { SearchOutlined } from '@ant-design/icons';
import _ from 'lodash';

function Dashboard() {
  const [list, setList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredList, setFilteredList] = useState([])
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  // componentDidMount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = (callback) => {
    apiRequest
      .get(`/tasks`, getAuthConfig())
      .then((response) => {
        const sortedList = _.sortBy(response.data.tasks, [function(o) { return o.createdAt; }]).reverse();
        setList(sortedList);
        setLoading(false)
      })
      .catch((error) => {
        console.log(error);
        notification.error({
          message: "Something went wrong! Please try again.",
        });
        setLoading(false)
      })
      .finally(()=> {
        if (callback) {
          callback()
        }
      })
  };

  const handleSearch = (e) => {
    const searchQuery = e.target.value
    _.debounce(() => {
      setSearchQuery(searchQuery)
    }, 500)()
  }

  const getFilteredList = () => {
    if (searchQuery.length <= 0) {
      return list
    }
    return _.filter(list, (task) => {
      return task.name.toLowerCase().includes(searchQuery.toLowerCase())
    })
  }

  useEffect(() => {
    setFilteredList(getFilteredList())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list, searchQuery])

  const handleAddModalOpen = () => {
    setShowAddModal(true)
  }

  return (
    <>
      <DashboardLayout>
        {loading ? (
          <div className={styles.spinnerWrapper}><Spin /></div>
        ) : (
          <>
            {list.length === 0 && (
              <EmptyList buttonHandler={handleAddModalOpen} />
            )}
            {list.length > 0 && (
              <div>
                <div className={styles.widgetContainer}>
                  <WidgetCompleted tasks={list}/>
                  <WidgetLatestTasks tasks={list}/>
                  <WidgetChart tasks={list}/>
                </div>
                <div className={styles.titleActionBar}>
                  <h2 className={styles.taskTitle}>Tasks</h2>
                  <div className={styles.taskSearch}>
                    <Input
                      placeholder="Search by task name"
                      prefix={<SearchOutlined />}
                      onChange={(e) => handleSearch(e)}
                      allowClear
                    />
                  </div>

                  <Button
                    className={styles.taskButton}
                    type="primary"
                    onClick={handleAddModalOpen}
                  >
                    New Task
                  </Button>
                </div>
                <div className={styles.taskList}>
                  {filteredList.length <= 0 &&
                    <div style={{height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                      No tasks found..
                    </div>
                  }
                  {filteredList.map((task) => {
                    return <TaskItem key={task._id} task={task} fetchData={fetchTasks}/>;
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </DashboardLayout>
      <TaskAddModal
        showModal={showAddModal}
        setShowModal={setShowAddModal}
        fetchTasks={fetchTasks}
      />
    </>
  );
}

export default Dashboard;
