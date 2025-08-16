# 📸 Images Guide for Sparkly Savvy Cleaning

## 📁 Images Folder Structure

Your images should be placed in the `public/images/` folder. This folder is now created and ready for your images.

```
public/
└── images/
    ├── team-photo.jpg          # Team photo for About section
    ├── before-after-1.jpg      # Before/after cleaning photos
    ├── before-after-2.jpg
    ├── cleaning-service-1.jpg  # Service-specific photos
    ├── cleaning-service-2.jpg
    ├── logo.png               # Company logo (if needed)
    └── hero-background.jpg    # Hero section background
```

## 🖼️ How to Use Images in Components

### 1. **Import the Image Component**
```typescript
import Image from 'next/image'
```

### 2. **Basic Image Usage**
```typescript
<Image
  src="/images/team-photo.jpg"
  alt="Sparkly Savvy Cleaning Team"
  width={400}
  height={300}
  className="rounded-lg"
/>
```

### 3. **Responsive Images with Fill**
```typescript
<div className="relative h-96 w-full">
  <Image
    src="/images/hero-background.jpg"
    alt="Clean home background"
    fill
    className="object-cover"
    sizes="(max-width: 768px) 100vw, 50vw"
  />
</div>
```

### 4. **Optimized Images**
```typescript
<Image
  src="/images/before-after-1.jpg"
  alt="Before and after cleaning"
  width={600}
  height={400}
  className="rounded-xl shadow-lg"
  priority={true} // For above-the-fold images
/>
```

## 🎯 Recommended Images for Your Website

### **Hero Section**
- Clean, bright home interiors
- Professional cleaning team in action
- Sparkling clean surfaces

### **About Section**
- Team photo (professional, friendly)
- Team members working
- Company vehicles or equipment

### **Services Section**
- Before/after cleaning photos
- Different types of cleaning (residential, commercial)
- Cleaning equipment and supplies

### **Testimonials/Reviews**
- Customer photos (with permission)
- Clean homes after service
- Happy customers

## 📏 Image Specifications

### **Recommended Sizes**
- **Hero Images**: 1920x1080px (16:9 ratio)
- **Team Photos**: 800x600px (4:3 ratio)
- **Service Images**: 600x400px (3:2 ratio)
- **Before/After**: 800x600px (4:3 ratio)
- **Logo**: 200x100px (2:1 ratio)

### **File Formats**
- **JPEG**: For photographs (team photos, before/after)
- **PNG**: For logos, icons, or images with transparency
- **WebP**: For better compression (Next.js supports this)

### **File Size Guidelines**
- **Hero Images**: < 500KB
- **Service Images**: < 200KB
- **Team Photos**: < 300KB
- **Before/After**: < 250KB

## 🔧 Image Optimization Tips

### **1. Use Descriptive Alt Text**
```typescript
alt="Professional cleaning team working in a modern kitchen"
```

### **2. Implement Lazy Loading**
```typescript
<Image
  src="/images/service-1.jpg"
  alt="Residential cleaning service"
  loading="lazy" // For images below the fold
/>
```

### **3. Use Priority for Important Images**
```typescript
<Image
  src="/images/hero-image.jpg"
  alt="Sparkly Savvy Cleaning Hero"
  priority={true} // For above-the-fold images
/>
```

### **4. Responsive Images**
```typescript
<Image
  src="/images/team-photo.jpg"
  alt="Our cleaning team"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

## 📝 Example: Adding Images to Components

### **Hero Section with Background Image**
```typescript
// In src/components/Hero.tsx
<div className="relative min-h-screen">
  <Image
    src="/images/hero-background.jpg"
    alt="Clean home background"
    fill
    className="object-cover"
    priority={true}
  />
  <div className="relative z-10">
    {/* Your hero content */}
  </div>
</div>
```

### **Services with Images**
```typescript
// In src/components/Services.tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {services.map((service, index) => (
    <div key={service.title} className="card">
      <div className="relative h-48 mb-4">
        <Image
          src={`/images/${service.image}`}
          alt={service.title}
          fill
          className="object-cover rounded-t-xl"
        />
      </div>
      {/* Service content */}
    </div>
  ))}
</div>
```

### **Before/After Gallery**
```typescript
// New component: src/components/Gallery.tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
  <div className="space-y-4">
    <h3 className="text-lg font-semibold">Before</h3>
    <Image
      src="/images/before-1.jpg"
      alt="Kitchen before cleaning"
      width={400}
      height={300}
      className="rounded-lg"
    />
  </div>
  <div className="space-y-4">
    <h3 className="text-lg font-semibold">After</h3>
    <Image
      src="/images/after-1.jpg"
      alt="Kitchen after cleaning"
      width={400}
      height={300}
      className="rounded-lg"
    />
  </div>
</div>
```

## 🚀 Next Steps

1. **Add your images** to the `public/images/` folder
2. **Update components** to use your actual images
3. **Optimize images** for web (compress, resize)
4. **Test responsiveness** on different devices
5. **Add alt text** for accessibility

## 💡 Pro Tips

- **Use high-quality images** that represent your brand
- **Keep file sizes small** for faster loading
- **Use consistent aspect ratios** for better layout
- **Include before/after photos** to showcase results
- **Show your team** to build trust and connection
- **Use professional photography** when possible

Your images folder is ready! Just drop your images in `public/images/` and update the components to reference them. 🎉
