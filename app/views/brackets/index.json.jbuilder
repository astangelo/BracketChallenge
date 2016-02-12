json.array!(@brackets) do |bracket|
  json.extract! bracket, :id, :challenge_id
  json.url bracket_url(bracket, format: :json)
end
