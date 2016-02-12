class GamePicksController < ApplicationController
  before_action :set_game_pick, only: [:show, :edit, :update, :destroy]

  # GET /game_picks
  # GET /game_picks.json
  def index
    @game_picks = GamePick.all
  end

  # GET /game_picks/1
  # GET /game_picks/1.json
  def show
  end

  # GET /game_picks/new
  def new
    @game_pick = GamePick.new
  end

  # GET /game_picks/1/edit
  def edit
  end

  # POST /game_picks
  # POST /game_picks.json
  def create
    @game_pick = GamePick.new(game_pick_params)

    respond_to do |format|
      if @game_pick.save
        format.html { redirect_to @game_pick, notice: 'Game pick was successfully created.' }
        format.json { render :show, status: :created, location: @game_pick }
      else
        format.html { render :new }
        format.json { render json: @game_pick.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /game_picks/1
  # PATCH/PUT /game_picks/1.json
  def update
    respond_to do |format|
      if @game_pick.update(game_pick_params)
        format.html { redirect_to @game_pick, notice: 'Game pick was successfully updated.' }
        format.json { render :show, status: :ok, location: @game_pick }
      else
        format.html { render :edit }
        format.json { render json: @game_pick.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /game_picks/1
  # DELETE /game_picks/1.json
  def destroy
    @game_pick.destroy
    respond_to do |format|
      format.html { redirect_to game_picks_url, notice: 'Game pick was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_game_pick
      @game_pick = GamePick.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def game_pick_params
      params.require(:game_pick).permit(:user_entry_id, :team_instance_id, :round)
    end
end
