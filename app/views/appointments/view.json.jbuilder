json.array!(@appointments) do |appointment|
  json.extract! appointment, :time, :day, :month, :year, :description
  json.url appointment_url(appointment, format: :json)
end
