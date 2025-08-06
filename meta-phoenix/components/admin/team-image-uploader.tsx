"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload } from "lucide-react"

interface TeamMember {
  id: string
  name: string
  image_url?: string
}

interface TeamImageUploaderProps {
  teamMembers: TeamMember[]
}

export function TeamImageUploader({ teamMembers }: TeamImageUploaderProps) {
  const [uploading, setUploading] = useState<string | null>(null)
  const [images, setImages] = useState<Record<string, string>>({})

  const handleImageUpload = async (memberId: string, file: File) => {
    setUploading(memberId)

    try {
      // Create form data
      const formData = new FormData()
      formData.append("file", file)
      formData.append("memberId", memberId)

      // Upload to your API endpoint
      const response = await fetch("/api/upload-team-image", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        const { imageUrl } = await response.json()
        setImages((prev) => ({ ...prev, [memberId]: imageUrl }))

        // Update database
        await fetch("/api/update-team-member", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: memberId, image_url: imageUrl }),
        })

        alert("Image uploaded successfully!")
      }
    } catch (error) {
      console.error("Upload failed:", error)
      alert("Upload failed. Please try again.")
    } finally {
      setUploading(null)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {teamMembers.map((member) => (
        <Card key={member.id} className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white text-lg">{member.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Current Image Preview */}
            <div className="aspect-square bg-gray-800 rounded-lg overflow-hidden">
              {images[member.id] || member.image_url ? (
                <img
                  src={images[member.id] || member.image_url}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">No Image</div>
              )}
            </div>

            {/* Upload Input */}
            <div className="space-y-2">
              <Label htmlFor={`image-${member.id}`} className="text-gray-300">
                Upload New Image
              </Label>
              <Input
                id={`image-${member.id}`}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    handleImageUpload(member.id, file)
                  }
                }}
                className="bg-black border-gray-700 text-white"
                disabled={uploading === member.id}
              />
            </div>

            {uploading === member.id && (
              <div className="text-center text-purple-400">
                <Upload className="h-4 w-4 animate-spin mx-auto mb-2" />
                Uploading...
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
