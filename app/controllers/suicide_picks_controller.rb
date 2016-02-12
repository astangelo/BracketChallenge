class SuicidePicksController < ApplicationController
  before_action :set_suicide_pick, only: [:show, :edit, :update, :destroy]

  # GET /suicide_picks
  # GET /suicide_picks.json
  def index
    @suicide_picks = SuicidePick.all
  end

  # GET /suicide_picks/1
  # GET /suicide_picks/1.json
  def show
  end

  # GET /suicide_picks/new
  def new
    @suicide_pick = SuicidePick.new
  end

  # GET /suicide_picks/1/edit
  def edit
  end

  # POST /suicide_picks
  # POST /suicide_picks.json
  def create
    @suicide_pick = SuicidePick.new(suicide_pick_params)

    respond_to do |format|
      if @suicide_pick.save
        format.html { redirect_to @suicide_pick, notice: 'Suicide pick was successfully created.' }
        format.json { render :show, status: :created, location: @suicide_pick }
      else
        format.html { render :new }
        format.json { render json: @suicide_pick.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /suicide_picks/1
  # PATCH/PUT /suicide_picks/1.json
  def update
    respond_to do |format|
      if @suicide_pick.update(suicide_pick_params)
        format.html { redirect_to @suicide_pick, notice: 'Suicide pick was successfully updated.' }
        format.json { render :show, status: :ok, location: @suicide_pick }
      else
        format.html { render :edit }
        format.json { render json: @suicide_pick.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /suicide_picks/1
  # DELETE /suicide_picks/1.json
  def destroy
    @suicide_pick.destroy
    respond_to do |format|
      format.html { redirect_to suicide_picks_url, notice: 'Suicide pick was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_suicide_pick
      @suicide_pick = SuicidePick.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def suicide_pick_params
      params.require(:suicide_pick).permit(:user_entry_id, :team_instance_id, :round)
    end
end
