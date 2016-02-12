require 'test_helper'

class TeamInstancesControllerTest < ActionController::TestCase
  setup do
    @team_instance = team_instances(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:team_instances)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create team_instance" do
    assert_difference('TeamInstance.count') do
      post :create, team_instance: { abbreviation: @team_instance.abbreviation, bracket_id: @team_instance.bracket_id, quadrant_id: @team_instance.quadrant_id, seed: @team_instance.seed, team_id: @team_instance.team_id }
    end

    assert_redirected_to team_instance_path(assigns(:team_instance))
  end

  test "should show team_instance" do
    get :show, id: @team_instance
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @team_instance
    assert_response :success
  end

  test "should update team_instance" do
    patch :update, id: @team_instance, team_instance: { abbreviation: @team_instance.abbreviation, bracket_id: @team_instance.bracket_id, quadrant_id: @team_instance.quadrant_id, seed: @team_instance.seed, team_id: @team_instance.team_id }
    assert_redirected_to team_instance_path(assigns(:team_instance))
  end

  test "should destroy team_instance" do
    assert_difference('TeamInstance.count', -1) do
      delete :destroy, id: @team_instance
    end

    assert_redirected_to team_instances_path
  end
end
