package com.cn.hnust.controller;

import java.io.IOException;
import java.util.Date;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.cn.hnust.pojo.Comment;
import com.cn.hnust.pojo.User;
import com.cn.hnust.service.ICommentService;
import com.cn.hnust.util.AbstractController;

/**
 * 
 * ClassName: CommentController 
 * @Description: 评论的控制器
 */
@Controller
@RequestMapping("/comment")
public class CommentController extends AbstractController {
	
	@Autowired
	private HttpSession session ;
	
	
	@Autowired
	private ICommentService commentService ;
	
	@RequestMapping("/create")
	public void createComment(Model model,Comment comment,HttpServletResponse response) throws IOException{
		User user = (User) session.getAttribute("user") ;
		if(user != null){
			try {
				comment.setUser_id(user.getId()+"");
				comment.setParent_id("-1");//如果直接评论帖子 父节点就是-1
				comment.setCreate_date(new Date());
				commentService.insertSelective(comment) ;
				response.getWriter().print("true");
			} catch (Exception e) {
				e.printStackTrace(); 
				response.getWriter().print("false");
			}
		}
	}
	
	/**
	 * 
	 * @Description: 回复上一级节点评论
	 * @param @param model
	 * @param @param comment
	 * @param @param response   
	 * @return void  
	 * @throws IOException 
	 * @throws
	 * @author crossoverJie
	 * @date 2016年2月9日  下午10:32:06
	 */
	@RequestMapping("/createParent")
	public void createParent(Model model,Comment comment,HttpServletResponse response) throws IOException{
		User user = (User) session.getAttribute("user") ;
		if(user != null){
			try {
				comment.setUser_id(user.getId()+"");
				comment.setCreate_date(new Date());
				commentService.insertSelective(comment) ;
				response.getWriter().print("true");
			} catch (Exception e) {
				e.printStackTrace(); 
				response.getWriter().print("false");
			}
		}
	}
	
	
	
	
}
