export default function LoadingSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="space-y-20">
        {/* About Section Skeleton */}
        <div className="py-20 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="h-12 bg-gray-200 rounded-md w-48 mx-auto mb-4"></div>
              <div className="w-20 h-1 bg-gray-200 mx-auto rounded-full"></div>
            </div>
            <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
              <div className="lg:col-span-1">
                <div className="w-64 h-80 bg-gray-200 rounded-2xl mx-auto"></div>
              </div>
              <div className="lg:col-span-2 space-y-6">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Articles Section Skeleton */}
        <div className="py-20 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="h-12 bg-gray-200 rounded-md w-64 mx-auto mb-4"></div>
              <div className="h-6 bg-gray-200 rounded-md w-96 mx-auto"></div>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
                  <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-gray-200 rounded-3xl mx-auto mb-6"></div>
                    <div className="h-6 bg-gray-200 rounded w-20 mx-auto mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-16 mx-auto mb-6"></div>
                    <div className="h-6 bg-gray-200 rounded w-full mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mt-2"></div>
                  </div>
                  <div className="pt-6 border-t border-gray-100">
                    <div className="h-6 bg-gray-200 rounded w-32 mx-auto"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Section Skeleton */}
        <div className="py-20 px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="h-12 bg-gray-200 rounded-md w-48 mx-auto mb-4"></div>
              <div className="h-6 bg-gray-200 rounded-md w-80 mx-auto"></div>
            </div>
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                  <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
                  <div className="space-y-6">
                    <div>
                      <div className="h-4 bg-gray-200 rounded w-16 mb-2"></div>
                      <div className="h-12 bg-gray-200 rounded w-full"></div>
                    </div>
                    <div>
                      <div className="h-4 bg-gray-200 rounded w-16 mb-2"></div>
                      <div className="h-12 bg-gray-200 rounded w-full"></div>
                    </div>
                    <div>
                      <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
                      <div className="h-32 bg-gray-200 rounded w-full"></div>
                    </div>
                    <div className="h-12 bg-gray-200 rounded w-full"></div>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center space-x-4 p-4 rounded-2xl">
                    <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-5 bg-gray-200 rounded w-24 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-32"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}