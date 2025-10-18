function FamilyMemberCard({ member, onUpload, onView, onRemove }){
    return(
        <div>
            FamilyMemberCard

              <div className="p-4 rounded-lg shadow bg-white">
      <h3 className="text-lg font-semibold">{member.name}</h3>
      <div className="mt-3 flex gap-2">
        <button onClick={() => onUpload(member)} className="btn">Upload Report</button>
        <button onClick={() => onView(member)} className="btn-outline">View</button>
        <button onClick={() => onRemove(member._id)} className="text-red-500">Remove</button>
      </div>
    </div>
        </div>
        
    )
}

export default FamilyMemberCard