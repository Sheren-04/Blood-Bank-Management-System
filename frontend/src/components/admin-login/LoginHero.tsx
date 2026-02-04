import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Shield, Heart, Activity } from 'lucide-react';

export function LoginHero() {
  return (
    <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-red-600 via-red-700 to-red-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 border-2 border-white rounded-full"></div>
        <div className="absolute bottom-32 right-20 w-48 h-48 border-2 border-white rounded-full"></div>
        <div className="absolute top-1/2 left-1/3 w-32 h-32 border-2 border-white rounded-full"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center px-16 w-full">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Heart className="w-8 h-8 text-white fill-white" />
            </div>
            <h1 className="text-3xl font-bold text-white">BloodLife</h1>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
            Admin Management<br />Portal
          </h2>
          <p className="text-red-100 text-lg leading-relaxed">
            Secure access to the blood donation management system. Monitor requests, manage donors, and save lives.
          </p>
        </div>

        {/* Feature Icons */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-white font-semibold">Secure Authentication</p>
              <p className="text-red-100 text-sm">End-to-end encrypted access</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-white font-semibold">Real-time Monitoring</p>
              <p className="text-red-100 text-sm">Track donations and requests live</p>
            </div>
          </div>
        </div>

        {/* Decorative Image */}
        <div className="mt-16 rounded-2xl overflow-hidden shadow-2xl">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1504813184591-01572f98c85f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwaGVhbHRoY2FyZSUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzY4OTM0ODYxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Medical healthcare technology"
            className="w-full h-64 object-cover opacity-90"
          />
        </div>
      </div>
    </div>
  );
}
