class ItemsController < ApplicationController
  before_action :set_department
  before_action :set_item, only: [:show, :edit, :update, :destroy]

  def index
    @items = @department.items
  end

  def show
  end

  def new
    @item = @department.items.new
  end

  def create
    @item = @department.items.new(item_params)
    if @item.save
      redirect_to department_item_path(@department, @item)
    else
      render :new
    end
  end

  def edit
    render :new
  end

  def update
    if @item.update(item_params)
      redirect_to department_item_path(@department, @item)
    else
      render :edit
    end
  end

  def destroy
    @item.destroy
    redirect_to root_path
  end

  private
  def item_params
    params.require(:item).permit(:name, :price, :description, :image_link)
  end

  def set_item
    @item = Item.find(params[:id])
  end

  def set_department
    @department = Department.find(params[:department_id])
  end
end
