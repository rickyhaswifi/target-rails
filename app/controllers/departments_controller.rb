class DepartmentsController < ApplicationController
  before_action :set_department, only: [:show, :edit, :update, :destroy]

  def index
    if params[:search]
      @department = Department.where('name ILIKE ?', "%#{params[:search]}%")
    else
      @department = Department.all
    end
  end

  def show
  end

  def new
    @department = Department.new
  end

  def create
    @department = Department.new(department_params)
    if @department.save
      redirect_to @department
    else
      render :new
    end
  end

  def edit
    render :new
  end

  def update
    if @department.update(department_params)
      redirect_to @department
    else
      render :new
    end
  end

  def destroy
    @department.destroy
    redirect_to root_path
  end

  private
  def department_params
    params.require(:department).permit(:search, :name, :image_link)
  end

  def set_department
    @department = Department.find(params[:id])
  end

end
