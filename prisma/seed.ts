import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  await prisma.appointment.deleteMany();
  await prisma.lead.deleteMany();
  await prisma.carImage.deleteMany();
  await prisma.car.deleteMany();
  await prisma.adminUser.deleteMany();

  const passwordHash = await bcrypt.hash("admin123456", 12);

  await prisma.adminUser.create({
    data: {
      email: "admin@supercars.vn",
      fullName: "Super Cars Admin",
      passwordHash,
    },
  });

  const cars = [
    {
      name: "Porsche 911 Carrera S",
      slug: "porsche-911-carrera-s-2023",
      brand: "Porsche",
      model: "911 Carrera S",
      year: 2023,
      price: BigInt(8950000000),
      mileageKm: 8200,
      color: "Xám Arctic",
      condition: "USED",
      fuelType: "GASOLINE",
      transmission: "AUTOMATIC",
      horsepower: 443,
      engine: "3.0L Twin-Turbo Flat-6",
      seats: 4,
      drivetrain: "RWD",
      heroTag: "Biểu tượng hiệu suất hàng ngày",
      shortDescription: "911 Carrera S cho người muốn cảm giác lái thuần Porsche nhưng vẫn usable mỗi ngày.",
      description: "Chiếc 911 này mang cấu hình sang trọng, vận hành sắc bén và giữ chất thể thao thuần chất Porsche. Phù hợp khách cần một mẫu xe biểu tượng nhưng vẫn thực tế để dùng cuối tuần lẫn di chuyển hằng ngày.",
      isFeatured: true,
      images: [
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80",
        "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1400&q=80"
      ],
    },
    {
      name: "Mercedes-Benz C300 AMG",
      slug: "mercedes-benz-c300-amg-2022",
      brand: "Mercedes-Benz",
      model: "C300 AMG",
      year: 2022,
      price: BigInt(1820000000),
      mileageKm: 18000,
      color: "Đen Obsidian",
      condition: "USED",
      fuelType: "GASOLINE",
      transmission: "AUTOMATIC",
      horsepower: 255,
      engine: "2.0L Turbo",
      seats: 5,
      drivetrain: "RWD",
      heroTag: "Sedan sang cho khách mua lần đầu",
      shortDescription: "Một chiếc sedan dễ tiếp cận nhưng vẫn mang hình ảnh cao cấp và công nghệ mới.",
      description: "C300 AMG là lựa chọn lý tưởng cho nhóm khách hàng muốn lên đời sedan sang với thiết kế hiện đại, cabin công nghệ cao và trải nghiệm lái êm nhưng đủ lực.",
      isFeatured: true,
      images: [
        "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1400&q=80",
        "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1400&q=80"
      ],
    },
    {
      name: "BMW X7 M Sport",
      slug: "bmw-x7-m-sport-2021",
      brand: "BMW",
      model: "X7 M Sport",
      year: 2021,
      price: BigInt(4390000000),
      mileageKm: 26000,
      color: "Trắng Mineral",
      condition: "CERTIFIED",
      fuelType: "GASOLINE",
      transmission: "AUTOMATIC",
      horsepower: 335,
      engine: "3.0L TwinPower Turbo",
      seats: 7,
      drivetrain: "AWD",
      heroTag: "SUV đầu bảng cho gia đình cao cấp",
      shortDescription: "Không gian rộng, trang bị cao, phù hợp khách cần SUV flagship để đi phố và đi tỉnh.",
      description: "X7 M Sport cân bằng giữa sự sang trọng, thực dụng và hình ảnh flagship. Đây là mẫu xe lý tưởng cho gia đình cần 7 chỗ nhưng vẫn ưu tiên trải nghiệm premium.",
      isFeatured: false,
      images: [
        "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1400&q=80",
        "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1400&q=80"
      ],
    },
    {
      name: "Tesla Model S Plaid",
      slug: "tesla-model-s-plaid-2023",
      brand: "Tesla",
      model: "Model S Plaid",
      year: 2023,
      price: BigInt(6790000000),
      mileageKm: 9500,
      color: "Đỏ Ultra",
      condition: "USED",
      fuelType: "ELECTRIC",
      transmission: "AUTOMATIC",
      horsepower: 1020,
      engine: "Tri-Motor Electric",
      seats: 5,
      drivetrain: "AWD",
      heroTag: "EV hiệu suất cực cao",
      shortDescription: "Mẫu sedan điện flagship cho khách yêu công nghệ, tăng tốc mạnh và hình ảnh khác biệt.",
      description: "Model S Plaid là lựa chọn cho nhóm khách muốn bước sang EV hiệu suất cao. Nội thất tối giản, sức mạnh vượt trội và trải nghiệm công nghệ khác biệt hoàn toàn so với sedan truyền thống.",
      isFeatured: true,
      images: [
        "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1400&q=80",
        "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1400&q=80"
      ],
    },
    {
      name: "Toyota Camry 2.5Q",
      slug: "toyota-camry-2-5q-2024",
      brand: "Toyota",
      model: "Camry 2.5Q",
      year: 2024,
      price: BigInt(1460000000),
      mileageKm: 1200,
      color: "Đen ánh kim",
      condition: "NEW",
      fuelType: "GASOLINE",
      transmission: "AUTOMATIC",
      horsepower: 207,
      engine: "2.5L Dynamic Force",
      seats: 5,
      drivetrain: "FWD",
      heroTag: "Sedan bền bỉ, lịch lãm, dễ ra quyết định",
      shortDescription: "Lựa chọn an toàn cho khách doanh nhân cần sedan rộng, bền và giữ giá.",
      description: "Camry 2.5Q phục vụ nhóm khách thực dụng hơn nhưng vẫn cần hình ảnh chỉnh chu. Xe phù hợp khách mua để dùng lâu dài, đi gia đình hoặc tiếp khách.",
      isFeatured: false,
      images: [
        "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1400&q=80",
        "https://images.unsplash.com/photo-1502161254066-6c74afbf07aa?auto=format&fit=crop&w=1400&q=80"
      ],
    },
    {
      name: "Lamborghini Huracán EVO",
      slug: "lamborghini-huracan-evo-2020",
      brand: "Lamborghini",
      model: "Huracán EVO",
      year: 2020,
      price: BigInt(16800000000),
      mileageKm: 5400,
      color: "Xanh Verde Mantis",
      condition: "USED",
      fuelType: "GASOLINE",
      transmission: "AUTOMATIC",
      horsepower: 631,
      engine: "5.2L V10",
      seats: 2,
      drivetrain: "RWD",
      heroTag: "Supercar cho khách hàng tìm cảm xúc tuyệt đối",
      shortDescription: "Một chiếc xe dành cho quyết định cảm xúc mạnh, hình ảnh mạnh và giá trị sưu tầm cao.",
      description: "Huracán EVO mang tới trải nghiệm siêu xe thuần chất: thấp, rộng, sắc và kịch tính. Đây là mẫu xe định vị hình ảnh cho showroom và tạo điểm nhấn cực mạnh cho storefront.",
      isFeatured: true,
      images: [
        "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1400&q=80",
        "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1400&q=80"
      ],
    },
  ];

  for (const car of cars) {
    const created = await prisma.car.create({
      data: {
        name: car.name,
        slug: car.slug,
        brand: car.brand,
        model: car.model,
        year: car.year,
        price: BigInt(car.price),
        mileageKm: car.mileageKm,
        color: car.color,
        condition: car.condition,
        fuelType: car.fuelType,
        transmission: car.transmission,
        horsepower: car.horsepower,
        engine: car.engine,
        seats: car.seats,
        drivetrain: car.drivetrain,
        shortDescription: car.shortDescription,
        description: car.description,
        heroTag: car.heroTag,
        isFeatured: car.isFeatured,
      },
    });

    await prisma.carImage.createMany({
      data: car.images.map((imageUrl, index) => ({
        carId: created.id,
        imageUrl,
        alt: created.name,
        sortOrder: index,
      })),
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
