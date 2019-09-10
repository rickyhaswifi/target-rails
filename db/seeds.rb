# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

department_images = ['http://bit.ly/2ma5ahT', 'https://bit.ly/2ma2qkB', 'https://bit.ly/2krtBa5', 'https://bit.ly/2kchhKA', 'https://bit.ly/2lN32fr', 'https://bit.ly/2k8gvy3', 'https://bit.ly/2kdtPRY', 'https://bit.ly/2kBkQdp', 'https://bit.ly/2lGCFYK' ]

item_images = ['https://bit.ly/2m1XeyT', 'https://bit.ly/2kc4TKD', 'http://bit.ly/2lH7gW4', 'http://bit.ly/2m1Y0Mj', 'http://bit.ly/2m93fKl', 'http://bit.ly/2kC0l0c', 'http://bit.ly/2lLfooI']

stars = ['⭐⭐⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐', '⭐⭐', '⭐']

10.times do 
    department = Department.create(
      name: Faker::House.room,
      image_link: department_images.sample
    )
    5.times do
      item = Item.create(
        department_id: department.id,
        name: Faker::FunnyName.name,
        price: Faker::Number.decimal(l_digits: 2),
        description: Faker::Quote.matz,
        image_link: item_images.sample
      )
  
      Comment.create(
        title: Faker::Dessert.topping,
        body: Faker::Quote.yoda,
        author: Faker::FunnyName.name,
        rating: stars.sample,
        item_id: item.id,
      )
    end
end
  
puts 'Data seeded.'