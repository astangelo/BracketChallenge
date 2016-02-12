require 'test_helper'

class GamePicksControllerTest < ActionController::TestCase
  setup do
    @game_pick = game_picks(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:game_picks)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create game_pick" do
    assert_difference('GamePick.count') do
      post :create, game_pick: { round: @game_pick.round, team_instance_id: @game_pick.team_instance_id, user_entry_id: @game_pick.user_entry_id }
    end

    assert_redirected_to game_pick_path(assigns(:game_pick))
  end

  test "should show game_pick" do
    get :show, id: @game_pick
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @game_pick
    assert_response :success
  end

  test "should update game_pick" do
    patch :update, id: @game_pick, game_pick: { round: @game_pick.round, team_instance_id: @game_pick.team_instance_id, user_entry_id: @game_pick.user_entry_id }
    assert_redirected_to game_pick_path(assigns(:game_pick))
  end

  test "should destroy game_pick" do
    assert_difference('GamePick.count', -1) do
      delete :destroy, id: @game_pick
    end

    assert_redirected_to game_picks_path
  end
end
