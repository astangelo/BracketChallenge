require 'test_helper'

class GamesControllerTest < ActionController::TestCase
  setup do
    @game = games(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:games)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create game" do
    assert_difference('Game.count') do
      post :create, game: { away_team_id: @game.away_team_id, away_team_score: @game.away_team_score, game_timer: @game.game_timer, half: @game.half, home_team_id: @game.home_team_id, home_team_score: @game.home_team_score, quadrant_id: @game.quadrant_id, start_time: @game.start_time }
    end

    assert_redirected_to game_path(assigns(:game))
  end

  test "should show game" do
    get :show, id: @game
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @game
    assert_response :success
  end

  test "should update game" do
    patch :update, id: @game, game: { away_team_id: @game.away_team_id, away_team_score: @game.away_team_score, game_timer: @game.game_timer, half: @game.half, home_team_id: @game.home_team_id, home_team_score: @game.home_team_score, quadrant_id: @game.quadrant_id, start_time: @game.start_time }
    assert_redirected_to game_path(assigns(:game))
  end

  test "should destroy game" do
    assert_difference('Game.count', -1) do
      delete :destroy, id: @game
    end

    assert_redirected_to games_path
  end
end
