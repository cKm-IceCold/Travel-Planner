# Social Travel Platform Roadmap

Evolving the Travel Planner into a collaborative, community-driven ecosystem combining social sharing, group planning, and coordination.

## Development Phases

### Phase 1: The Collective Feed (Social Layer)
*Objective: Transform internal blogs into a public community feed.*
- **Social Feed**: Allow all users to post experiences.
- **Engagement**: Simple "Like" and "Save" functionality.
- **Enhanced Profiles**: Show public posts on user profiles.

### Phase 2: Collaborative Trips (Core Planning)
*Objective: Move from "My Itinerary" to "Shared Trips".*
- **Trips Collection**: Create a new Firestore collection `trips` where each document is a shared project.
- **Collaborators**: Add an `invitedUsers` array to trips.
- **Roles**: Implement simple Owner/Editor permissions.

### Phase 3: Group Coordination (Execution Layer)
*Objective: Add interactive planning tools.*
- **Shared Checklists**: Add a `tasks` sub-collection to each trip.
- **Hotel Voting**: Allow users to "vote" or "react" on hotel options within a trip.

### Phase 4: Communication (Real-time Layer)
- **Trip Chat**: Basic message history for each shared trip.
- **Notifications**: System messages for trip updates (e.g., "User X added a hotel").

---

## Proposed Changes

### Data Architecture Updates (Firestore)

#### [MODIFY] [ItineraryContext.jsx](file:///c:/Users/my%20pc/Desktop/Travel-Planner/frontend-app/src/context/ItineraryContext.jsx)
- Introduce a `trips` state to manage multiple collaborative trips.
- `itinerary` will become a legacy local wishlist or the "current active trip".
- Add `createTrip`, `inviteFriend`, and `updateTripItem` functions.

#### [MODIFY] [BlogContext.jsx](file:///c:/Users/my%20pc/Desktop/Travel-Planner/frontend-app/src/context/BlogContext.jsx) -> [SocialContext.jsx]
- Transition from restricted admin blogs to open public `posts`.
- Add `likePost` and `addComment` logic.

### UI/Component Enhancements

#### [NEW] [TripDashboard.jsx](file:///c:/Users/my%20pc/Desktop/Travel-Planner/frontend-app/src/pages/TripDashboard.jsx)
- A specialized view for a single collaborative trip containing the itinerary, checklist, and chat.

#### [MODIFY] [NavBar.jsx](file:///c:/Users/my%20pc/Desktop/Travel-Planner/frontend-app/src/components/NavBar.jsx)
- Rename "Itinerary" to "My Trips".
- Update mobile navigation for social shortcuts.

## Verification Plan

### Manual Verification
1. **Collaboration**: Create a trip, invite a secondary test user, and verify both can see changes in real-time.
2. **Social Feed**: Post a memory and check if other users can see/like it.
3. **Checklist**: Complete a task in a shared trip and verify the "completed" status syncs for everyone.
