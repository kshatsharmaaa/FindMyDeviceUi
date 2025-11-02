# Find My Device UI 

A responsive Find My Device UI clone built with Next.js, React, and Leaflet.js with dummy data.

## Features

- 📱 Device dashboard with list view
- 🗺️ Interactive map with device markers
- 🔍 Device search and filtering
- ⚡ Smooth animations and transitions
- 📲 Device actions (Ring, Factory Reset)
- 💅 Responsive design

## Tech Stack

- **Next.js 16** - React framework
- **React** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Leaflet.js** - Interactive maps
- **Lucide React** - Icons

## Installation



### Setup Steps

1. **Create Next.js Project**
```bash
npx create-next-app@latest find-my-device --typescript --tailwind --app --no-src-dir
cd find-my-device
```

2. **Install Dependencies**
```bash
npm install leaflet react-leaflet lucide-react
npm install -D @types/leaflet
```

3. **Copy Project Files**

Copy all the files from the provided structure into your project directory.

4. **Run Development Server**
```bash
npm run dev
```

5. **Open Browser**

Navigate to `http://localhost:3000`

## Project Structure

```
find-my-device/
├── app/
│   ├── layout.tsx           
│   ├── page.tsx             
│   └── globals.css          
├── components/
│   ├── DeviceList.tsx       
│   ├── DeviceCard.tsx       
│   ├── DeviceDetails.tsx    
│   ├── MapView.tsx          
│   ├── SearchBar.tsx        
│   ├── ActionButtons.tsx    
        
├── lib/
│   ├── deviceData.ts        # Dummy device data
│   └── types.ts             # TypeScript types

```

## Usage

### Features Overview

1. **Device List**: View all devices in the left sidebar
2. **Map View**: See device locations on an interactive map
3. **Search**: Filter devices by name or location
4. **Dark Mode**: Toggle between light and dark themes
5. **Device Actions**: 
   - Ring device (shows confirmation)
   - Factory reset (with confirmation dialog)

### Customization

#### Adding More Devices

Edit `lib/deviceData.ts`:

```typescript
export const devices: Device[] = [
  {
    id: 3,
    name: "iPad Air",
    location: "Los Angeles, USA",
    lat: 34.0522,
    lng: -118.2437,
    battery: 65,
    lastSeen: "2 hours ago",
    status: "offline"
  },
  // Add more devices...
];
```

