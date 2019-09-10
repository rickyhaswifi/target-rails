class CommentsController < ApplicationController
  before_action :set_item
  before_action :set_comment, only: [:show, :edit, :update, :destroy]

  def index
    @comments = @item.comments
  end

  def show
  end

  def new
    @comment = @item.comments.new
  end

  def create
    @comment = @item.comments.new(comment_params)
    if @comment.save
      redirect_to item_comment_path(@item, @comment)
    else
      render :new
    end
  end

  def edit
    render :new
  end

  def update
    if @comment.update(comment_params)
      redirect_to item_comment_path(@item, @comment)
    else
      render :edit
    end
  end

  def destroy
    @comment.destroy
    redirect_to root_path
  end

  private
  def comment_params
    params.require(:comment).permit(:title, :body, :rating, :author)
  end

  def set_comment
    @comment = Comment.find(params[:id])
  end

  def set_item
    @item = Item.find(params[:item_id])
  end
end
