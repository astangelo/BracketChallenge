class RandomPicksController < ApplicationController
  before_action :set_random_pick, only: [:show, :edit, :update, :destroy]

  # GET /random_picks
  # GET /random_picks.json
  def index
    @random_picks = RandomPick.all
  end

  # GET /random_picks/1
  # GET /random_picks/1.json
  def show
  end

  # GET /random_picks/new
  def new
    @random_pick = RandomPick.new
  end

  # GET /random_picks/1/edit
  def edit
  end

  # POST /random_picks
  # POST /random_picks.json
  def create
    @random_pick = RandomPick.new(random_pick_params)

    respond_to do |format|
      if @random_pick.save
        format.html { redirect_to @random_pick, notice: 'Random pick was successfully created.' }
        format.json { render :show, status: :created, location: @random_pick }
      else
        format.html { render :new }
        format.json { render json: @random_pick.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /random_picks/1
  # PATCH/PUT /random_picks/1.json
  def update
    respond_to do |format|
      if @random_pick.update(random_pick_params)
        format.html { redirect_to @random_pick, notice: 'Random pick was successfully updated.' }
        format.json { render :show, status: :ok, location: @random_pick }
      else
        format.html { render :edit }
        format.json { render json: @random_pick.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /random_picks/1
  # DELETE /random_picks/1.json
  def destroy
    @random_pick.destroy
    respond_to do |format|
      format.html { redirect_to random_picks_url, notice: 'Random pick was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_random_pick
      @random_pick = RandomPick.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def random_pick_params
      params.require(:random_pick).permit(:user_entry_id, :team_instance_id, :round)
    end
end
