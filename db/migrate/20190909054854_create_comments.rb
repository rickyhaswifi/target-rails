class CreateComments < ActiveRecord::Migration[6.0]
  def change
    create_table :comments do |t|
      t.string :title
      t.string :body
      t.string :rating
      t.string :author
      t.belongs_to :item, null: false, foreign_key: true

      t.timestamps
    end
  end
end
