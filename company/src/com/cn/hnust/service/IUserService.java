package com.cn.hnust.service;


import java.util.List;

import com.cn.hnust.pojo.News;
import com.cn.hnust.pojo.User;
import com.cn.hnust.util.Page;

public interface IUserService {
	public User getUserById(int userId);
	public int createUser(User user) ;
	public User findByLogin(User user) ;
	public Page<User> findByParams(User u,int pageNo,int limit) ;
	public int deleteByPrimaryKey(Integer id);
	public int updateByPrimaryKeySelective(User record);
	public int findAllCount(User u) ;
	public List<User> findHotUser() ;
}
