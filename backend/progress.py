from typing import Dict, List, Optional, Any
from pydantic import BaseModel
from datetime import datetime
import json
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class ProgressUpdate(BaseModel):
    user_id: str
    chapter_id: str
    lesson_id: Optional[str] = None
    progress_percentage: float
    time_spent: Optional[int] = None  # in seconds
    completed: bool = False
    score: Optional[float] = None
    notes: Optional[str] = None

class ProgressRecord(BaseModel):
    user_id: str
    chapter_id: str
    lesson_id: Optional[str] = None
    progress_percentage: float
    time_spent: Optional[int] = None
    completed: bool
    score: Optional[float] = None
    notes: Optional[str] = None
    last_updated: datetime
    created_at: datetime

class LearningRecommendation(BaseModel):
    chapter_id: str
    lesson_id: Optional[str] = None
    title: str
    reason: str
    priority: int  # 1-5 scale

class ProgressTrackingService:
    def __init__(self):
        # In-memory storage (replace with database in production)
        self.progress_records: Dict[str, Dict[str, ProgressRecord]] = {}
        self.user_profiles: Dict[str, Dict[str, Any]] = {}

    def save_progress(self, progress_update: ProgressUpdate) -> ProgressRecord:
        """Save or update user progress."""
        user_id = progress_update.user_id
        chapter_id = progress_update.chapter_id

        # Create user profile if it doesn't exist
        if user_id not in self.user_profiles:
            self.user_profiles[user_id] = {
                "user_id": user_id,
                "enrolled_courses": [],
                "learning_preferences": {},
                "completed_chapters": [],
                "total_time_spent": 0,
                "average_score": 0.0
            }

        # Create or update progress record
        record_key = f"{user_id}:{chapter_id}:{progress_update.lesson_id or 'chapter'}"

        record = ProgressRecord(
            user_id=progress_update.user_id,
            chapter_id=progress_update.chapter_id,
            lesson_id=progress_update.lesson_id,
            progress_percentage=min(100.0, max(0.0, progress_update.progress_percentage)),
            time_spent=progress_update.time_spent,
            completed=progress_update.completed,
            score=progress_update.score,
            notes=progress_update.notes,
            last_updated=datetime.utcnow(),
            created_at=self.progress_records.get(record_key, {}).get('created_at', datetime.utcnow())
        )

        # Store the record
        if user_id not in self.progress_records:
            self.progress_records[user_id] = {}

        self.progress_records[user_id][record_key] = record

        # Update user profile with statistics
        user_profile = self.user_profiles[user_id]
        if progress_update.completed and chapter_id not in user_profile["completed_chapters"]:
            user_profile["completed_chapters"].append(chapter_id)

        if progress_update.time_spent:
            user_profile["total_time_spent"] += progress_update.time_spent

        if progress_update.score is not None:
            # Calculate average score
            completed_lessons = [r for r in self.progress_records[user_id].values()
                               if r.score is not None]
            if completed_lessons:
                avg_score = sum(r.score for r in completed_lessons) / len(completed_lessons)
                user_profile["average_score"] = avg_score

        logger.info(f"Progress saved for user {user_id}, chapter {chapter_id}")
        return record

    def get_user_progress(self, user_id: str, chapter_id: str = None) -> List[ProgressRecord]:
        """Get user progress for a specific chapter or all chapters."""
        if user_id not in self.progress_records:
            return []

        if chapter_id:
            # Filter for specific chapter
            records = [record for key, record in self.progress_records[user_id].items()
                      if chapter_id in key]
        else:
            # Get all records for the user
            records = list(self.progress_records[user_id].values())

        return sorted(records, key=lambda x: x.last_updated, reverse=True)

    def get_user_profile(self, user_id: str) -> Optional[Dict[str, Any]]:
        """Get user profile with learning statistics."""
        if user_id in self.user_profiles:
            profile = self.user_profiles[user_id].copy()
            # Add calculated statistics
            progress_records = self.progress_records.get(user_id, {})
            total_chapters = len(set(r.chapter_id for r in progress_records.values()))
            profile["total_chapters"] = total_chapters
            profile["completion_percentage"] = (
                len(profile["completed_chapters"]) / total_chapters * 100 if total_chapters > 0 else 0
            ) if total_chapters > 0 else 0
            return profile
        return None

    def get_learning_recommendations(self, user_id: str) -> List[LearningRecommendation]:
        """Generate personalized learning recommendations based on user progress."""
        recommendations = []

        user_profile = self.user_profiles.get(user_id)
        if not user_profile:
            # User doesn't exist, return basic recommendations
            recommendations.append(LearningRecommendation(
                chapter_id="chapter1",
                title="Introduction to Physical AI",
                reason="Start with the basics to build a strong foundation",
                priority=5
            ))
            return recommendations

        # Get user's progress
        user_progress = self.get_user_progress(user_id)

        # Find chapters with low progress or not started
        completed_chapters = set(user_profile["completed_chapters"])
        all_chapters = {"chapter1", "chapter2", "chapter3"}  # Adjust based on actual chapters

        incomplete_chapters = all_chapters - completed_chapters

        for chapter_id in incomplete_chapters:
            if chapter_id not in completed_chapters:
                recommendations.append(LearningRecommendation(
                    chapter_id=chapter_id,
                    title=f"Chapter: {chapter_id.replace('chapter', ' ').title()}",
                    reason="This chapter has not been started and is important for your learning path",
                    priority=4
                ))

        # Find chapters where user scored low (if scores exist)
        low_scoring_chapters = []
        for record in user_progress:
            if record.score is not None and record.score < 70:  # Below 70% score
                low_scoring_chapters.append(record.chapter_id)

        for chapter_id in low_scoring_chapters:
            recommendations.append(LearningRecommendation(
                chapter_id=chapter_id,
                title=f"Review: {chapter_id.replace('chapter', ' ').title()}",
                reason="You scored below 70% in this chapter. Review to improve understanding",
                priority=5
            ))

        # Sort by priority (highest first)
        recommendations.sort(key=lambda x: x.priority, reverse=True)

        return recommendations

    def calculate_overall_progress(self, user_id: str) -> float:
        """Calculate overall progress percentage for a user."""
        user_progress = self.get_user_progress(user_id)
        if not user_progress:
            return 0.0

        total_progress = sum(record.progress_percentage for record in user_progress)
        return total_progress / len(user_progress) if user_progress else 0.0

    def get_completion_stats(self, user_id: str) -> Dict[str, Any]:
        """Get detailed completion statistics for a user."""
        user_profile = self.get_user_profile(user_id)
        user_progress = self.get_user_progress(user_id)

        if not user_profile or not user_progress:
            return {
                "overall_progress": 0.0,
                "chapters_completed": 0,
                "total_chapters": 0,
                "time_spent": 0,
                "average_score": 0.0
            }

        overall_progress = self.calculate_overall_progress(user_id)
        time_spent = sum((record.time_spent or 0) for record in user_progress)

        return {
            "overall_progress": overall_progress,
            "chapters_completed": len(user_profile["completed_chapters"]),
            "total_chapters": len(set(r.chapter_id for r in user_progress)),
            "time_spent": time_spent,
            "average_score": user_profile["average_score"]
        }

# Global instance of the progress tracking service
progress_service = ProgressTrackingService()


# Example usage and testing
if __name__ == "__main__":
    # Test the progress tracking service
    print("Testing Progress Tracking Service...")

    # Create a progress update
    progress_update = ProgressUpdate(
        user_id="user123",
        chapter_id="chapter1",
        lesson_id="lesson1",
        progress_percentage=50.0,
        time_spent=1200,  # 20 minutes
        completed=False,
        score=85.0,
        notes="Good understanding of basic concepts"
    )

    # Save the progress
    record = progress_service.save_progress(progress_update)
    print(f"Saved progress: {record}")

    # Get user progress
    user_progress = progress_service.get_user_progress("user123", "chapter1")
    print(f"User progress: {user_progress}")

    # Get learning recommendations
    recommendations = progress_service.get_learning_recommendations("user123")
    print(f"Recommendations: {recommendations}")

    # Get completion stats
    stats = progress_service.get_completion_stats("user123")
    print(f"Completion stats: {stats}")