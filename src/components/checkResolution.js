export default function () {
	if (window.innerWidth < 768) {
		return 'mobile';
	}
	if (window.innerWidth < 768 && window.innerWidth > 767) {
		return 'tablet';
	}
	return 'desktop';
}
