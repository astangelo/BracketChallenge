class TeamInstancesController < ApplicationController
  before_action :set_team_instance, only: [:show, :edit, :update, :destroy]

  # GET /team_instances
  # GET /team_instances.json
  def index
    @team_instances = TeamInstance.all
  end

  # GET /team_instances/1
  # GET /team_instances/1.json
  def show
  end

  # GET /team_instances/new
  def new
    @team_instance = TeamInstance.new
  end

  # GET /team_instances/1/edit
  def edit
  end

  # POST /team_instances
  # POST /team_instances.json
  def create
    @team_instance = TeamInstance.new(team_instance_params)

    respond_to do |format|
      if @team_instance.save
        format.html { redirect_to @team_instance, notice: 'Team instance was successfully created.' }
        format.json { render :show, status: :created, location: @team_instance }
      else
        format.html { render :new }
        format.json { render json: @team_instance.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /team_instances/1
  # PATCH/PUT /team_instances/1.json
  def update
    respond_to do |format|
      if @team_instance.update(team_instance_params)
        format.html { redirect_to @team_instance, notice: 'Team instance was successfully updated.' }
        format.json { render :show, status: :ok, location: @team_instance }
      else
        format.html { render :edit }
        format.json { render json: @team_instance.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /team_instances/1
  # DELETE /team_instances/1.json
  def destroy
    @team_instance.destroy
    respond_to do |format|
      format.html { redirect_to team_instances_url, notice: 'Team instance was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_team_instance
      @team_instance = TeamInstance.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def team_instance_params
      params.require(:team_instance).permit(:team_id, :bracket_id, :quadrant_id, :abbreviation, :seed)
    end
end
