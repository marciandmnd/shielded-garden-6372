class CreateAppointments < ActiveRecord::Migration
  def change
    create_table :appointments do |t|
      t.string :time
      t.integer :day
      t.integer :month
      t.integer :year
      t.string :description

      t.timestamps
    end
  end
end
